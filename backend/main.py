from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import httpx
import os
from dotenv import load_dotenv
from openai import OpenAI
from enum import IntEnum

load_dotenv()

# Enums
class AccessTier(IntEnum):
    PRIVATE = 1
    TOKEN_HOLDERS = 2
    PUBLIC = 3

class ActionType(IntEnum):
    POST = 1
    REPLY = 2
    QUOTE = 3
    LIKE = 4
    SUMMARIZE = 5
    ANALYSIS = 6

# Pydantic Models
class CompanionMintingRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    personality: str = Field(..., min_length=10, max_length=500)
    system_prompt: str = Field(..., min_length=20, max_length=2000)
    fid: int
    access_tier: AccessTier = AccessTier.PRIVATE
    signature: str

class CompanionMintingResponse(BaseModel):
    success: bool
    token_id: Optional[int] = None
    transaction_hash: Optional[str] = None
    message: str

class AIInteractionRequest(BaseModel):
    token_id: int
    user_fid: int
    action_type: ActionType
    context: Optional[str] = None
    parent_hash: Optional[str] = None

class AIInteractionResponse(BaseModel):
    success: bool
    content: Optional[str] = None
    transaction_hash: Optional[str] = None
    needs_approval: bool = False
    message: str

class CompanionDataResponse(BaseModel):
    token_id: int
    name: str
    personality: str
    system_prompt: str
    creation_time: datetime
    total_interactions: int
    owner_fid: int
    access_tier: AccessTier
    can_interact: bool

class TrendingTopic(BaseModel):
    topic: str
    engagement_count: int
    sentiment: str

# Configuration
NEYNAR_API_URL = "https://api.neynar.com/v2/farcaster"
WARPCAST_API_URL = "https://api.warpcast.com/v2"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
NEYNAR_API_KEY = os.getenv("NEYNAR_API_KEY")
CONTRACT_ADDRESS = os.getenv("CASTMATE_CONTRACT_ADDRESS")
WEB3_API_KEY = os.getenv("CASTMATE_WEB3_API_KEY")

app = FastAPI(
    title="SelfAI API",
    description="AI-powered Farcaster companion with token-gated access",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=OPENAI_API_KEY)
headers = {
    "accept": "application/json",
    "x-api-key": NEYNAR_API_KEY,
}

# In-memory storage for demo (use database in production)
companions_db = {}
pending_approvals = {}
user_preferences = {}

def get_companion_context(token_id: int) -> str:
    """Get companion personality and context for AI generation"""
    if token_id not in companions_db:
        return "You are a helpful AI assistant."
    
    comp = companions_db[token_id]
    return f"""
Name: {comp['name']}
Personality: {comp['personality']}
System Prompt: {comp['system_prompt']}
Tone: {comp.get('tone', 'conversational')}
Expertise: {', '.join(comp.get('expertise', ['general']))}
""".strip()

@app.get("/")
async def root():
    return {
        "name": "SelfAI API",
        "version": "1.0.0",
        "description": "Tokenized AI companions for Farcaster",
        "endpoints": {
            "mint": "POST /companions",
            "interact": "POST /interact",
            "approve": "POST /approve",
            "trending": "GET /trending",
            "companion": "GET /companions/{token_id}"
        }
    }

@app.post("/companions", response_model=CompanionMintingResponse)
async def mint_companion(request: CompanionMintingRequest):
    """Mint a new AI companion NFT"""
    try:
        token_id = len(companions_db) + 1
        
        companions_db[token_id] = {
            "name": request.name,
            "personality": request.personality,
            "system_prompt": request.system_prompt,
            "access_tier": request.access_tier,
            "owner_fid": request.fid,
            "creation_time": datetime.now(),
            "total_interactions": 0,
            "pending_approvals": [],
            "tone": "conversational",
            "expertise": ["web3", "farcaster"],
            "auto_post_enabled": False,
            "schedule": []
        }
        
        user_preferences[request.fid] = {
            "token_id": token_id,
            "approved_actions": [ActionType.POST.value, ActionType.REPLY.value],
            "requires_approval": True,
            "max_daily_posts": 5
        }
        
        return CompanionMintingResponse(
            success=True,
            token_id=token_id,
            message=f"Successfully minted {request.name} as SelfAI #{token_id}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/companions/{token_id}", response_model=CompanionDataResponse)
async def get_companion(token_id: int):
    """Get companion data"""
    if token_id not in companions_db:
        raise HTTPException(status_code=404, detail="Companion not found")
    
    comp = companions_db[token_id]
    return CompanionDataResponse(
        token_id=token_id,
        name=comp["name"],
        personality=comp["personality"],
        system_prompt=comp["system_prompt"],
        creation_time=comp["creation_time"],
        total_interactions=comp["total_interactions"],
        owner_fid=comp["owner_fid"],
        access_tier=comp["access_tier"],
        can_interact=True
    )

@app.post("/interact", response_model=AIInteractionResponse)
async def interact_with_companion(request: AIInteractionRequest):
    """Interact with an AI companion"""
    if request.token_id not in companions_db:
        raise HTTPException(status_code=404, detail="Companion not found")
    
    comp = companions_db[request.token_id]
    needs_approval = user_preferences.get(comp["owner_fid"], {}).get("requires_approval", True)
    
    if needs_approval and request.action_type in [ActionType.POST, ActionType.QUOTE]:
        approval_id = len(pending_approvals) + 1
        pending_approvals[approval_id] = {
            "token_id": request.token_id,
            "user_fid": request.user_fid,
            "action_type": request.action_type,
            "context": request.context,
            "parent_hash": request.parent_hash,
            "created_at": datetime.now()
        }
        return AIInteractionResponse(
            success=True,
            needs_approval=True,
            message=f"Content generated and queued for approval (ID: {approval_id})"
        )
    
    return await execute_action(request, comp)

async def execute_action(request: AIInteractionRequest, comp: dict) -> AIInteractionResponse:
    """Execute the AI action"""
    context = get_companion_context(request.token_id)
    
    if request.action_type == ActionType.POST:
        prompt = f"""{context}
Generate an engaging Farcaster post based on: {request.context or 'trending topics'}
Max 320 characters. Be authentic and add value.
"""
    elif request.action_type == ActionType.REPLY:
        prompt = f"""{context}
Reply to this cast: {request.context}
Max 320 characters. Be thoughtful and add value.
"""
    elif request.action_type == ActionType.SUMMARIZE:
        prompt = f"""{context}
Summarize this content concisely: {request.context}
Keep it under 200 characters.
"""
    else:
        prompt = f"{context}\n\n{request.context}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200
        )
        content = response.choices[0].message.content.strip()
        
        if request.action_type in [ActionType.POST, ActionType.REPLY]:
            result = await post_to_farcaster(
                content,
                comp["owner_fid"],
                request.parent_hash if request.action_type == ActionType.REPLY else None
            )
            if result["success"]:
                companions_db[request.token_id]["total_interactions"] += 1
                return AIInteractionResponse(
                    success=True,
                    content=content,
                    transaction_hash=result.get("hash"),
                    message="Successfully posted to Farcaster"
                )
        
        return AIInteractionResponse(
            success=True,
            content=content,
            message="Content generated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def post_to_farcaster(text: str, fid: int, parent_hash: str = None) -> dict:
    """Post to Farcaster via Neynar API"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as http_client:
            payload = {
                "text": text,
                "fid": fid,
            }
            if parent_hash:
                payload["parent_cast_id"] = parent_hash
            
            response = await http_client.post(
                f"{NEYNAR_API_URL}/casts",
                json=payload,
                headers=headers
            )
            
            if response.status_code == 200:
                return {"success": True, "hash": response.json().get("cast", {}).get("hash")}
            return {"success": False, "error": response.text}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/approve/{approval_id}")
async def approve_action(approval_id: int, user_fid: int):
    """Approve a pending action"""
    if approval_id not in pending_approvals:
        raise HTTPException(status_code=404, detail="Pending approval not found")
    
    approval = pending_approvals[approval_id]
    comp = companions_db[approval["token_id"]]
    
    if comp["owner_fid"] != user_fid:
        raise HTTPException(status_code=403, detail="Not authorized to approve")
    
    request = AIInteractionRequest(
        token_id=approval["token_id"],
        user_fid=approval["user_fid"],
        action_type=approval["action_type"],
        context=approval["context"],
        parent_hash=approval["parent_hash"]
    )
    
    del pending_approvals[approval_id]
    return await execute_action(request, comp)

@app.get("/trending")
async def get_trending(top_n: int = 10) -> List[TrendingTopic]:
    """Get trending topics on Farcaster"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as http_client:
            response = await http_client.get(
                f"{NEYNAR_API_URL}/feed/trending",
                headers=headers,
                params={"limit": top_n}
            )
            
            if response.status_code == 200:
                data = response.json()
                topics = []
                for cast in data.get("casts", [])[:top_n]:
                    topics.append(TrendingTopic(
                        topic=cast.get("text", "")[:100],
                        engagement_count=cast.get("replies_count", 0) + cast.get("reactions_count", 0),
                        sentiment="positive"
                    ))
                return topics
            return []
    except Exception as e:
        return []

@app.post("/companions/{token_id}/auto-post")
async def toggle_auto_post(token_id: int, enabled: bool, user_fid: int):
    """Toggle auto-posting for a companion"""
    if token_id not in companions_db:
        raise HTTPException(status_code=404, detail="Companion not found")
    
    comp = companions_db[token_id]
    if comp["owner_fid"] != user_fid:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    comp["auto_post_enabled"] = enabled
    return {"success": True, "message": f"Auto-post {'enabled' if enabled else 'disabled'}"}

@app.post("/companions/{token_id}/schedule")
async def add_to_schedule(
    token_id: int,
    user_fid: int,
    time: str,  # HH:MM format
    action_type: ActionType,
    context: str
):
    """Add an action to the companion's schedule"""
    if token_id not in companions_db:
        raise HTTPException(status_code=404, detail="Companion not found")
    
    comp = companions_db[token_id]
    if comp["owner_fid"] != user_fid:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if "schedule" not in comp:
        comp["schedule"] = []
    
    comp["schedule"].append({
        "time": time,
        "action_type": action_type,
        "context": context
    })
    
    return {"success": True, "message": "Added to schedule"}

@app.get("/marketplace/featured")
async def get_featured_companions() -> List[dict]:
    """Get featured/featured companions for marketplace"""
    featured = []
    for token_id, comp in companions_db.items():
        if comp["access_tier"] >= AccessTier.TOKEN_HOLDERS:
            featured.append({
                "token_id": token_id,
                "name": comp["name"],
                "personality": comp["personality"][:100],
                "total_interactions": comp["total_interactions"],
                "access_tier": comp["access_tier"],
                "expertise": comp.get("expertise", [])
            })
    return featured

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

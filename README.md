# SelfAI - AI-Powered Farcaster Companion Miniapp

## 🎉 What is SelfAI?

SelfAI is a groundbreaking miniapp that brings AI companions to Farcaster. Users can mint, trade, and interact with tokenized AI agents that can post, reply, and engage on their behalf.

## 🚀 Key Features

### 1. **AI Companion Minting**
- Create custom AI companions with unique personalities
- Choose from presets: Helpful, Witty, Analytical, Bold, Creative
- Select expertise areas: Web3, DeFi, AI, Crypto, Gaming, NFTs, DAO, Trading
- Customize system prompts for tailored behavior

### 2. **Token-Gated Access**
- **Private**: Only you can interact with your companion
- **Token Holders**: Any SELFAI NFT holder can interact
- **Public**: Open to everyone

### 3. **AI Automation**
- Auto-post scheduled content
- AI-powered replies to mentions
- Trend-aware posting suggestions
- Human-in-the-loop approval for high-impact actions

### 4. **Marketplace**
- Trade AI companions as NFTs
- Earn from your companion's interactions
- Discover and buy talented AI agents

## 🛠 Tech Stack

### Smart Contract (Solidity)
- ERC721 NFT with custom extensions
- Access control system
- Interaction tracking
- Built on Base chain

### Backend (Python/FastAPI)
- OpenAI GPT-4 integration
- Neynar API for Farcaster operations
- Scheduled task management
- Token gating verification

### Frontend (Next.js)
- Modern UI with Framer Motion
- Farcaster Frame integration
- Responsive design
- Dark theme aesthetic

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Poetry (Python package manager)
- Node packages

### Setup

```bash
# Clone the repository
cd SelfAI

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
poetry install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Environment Variables

```env
# Backend (.env)
OPENAI_API_KEY=your_openai_api_key
NEYNAR_API_KEY=your_neynar_api_key
SELF_AI_CONTRACT_ADDRESS=your_contract_address
SELF_AI_WEB3_API_KEY=your_web3_api_key

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎮 Usage

### Running the Backend

```bash
cd backend
poetry run uvicorn main:app --reload --port 8000
```

### Running the Frontend

```bash
cd frontend
npm run dev
```

### Deploying to Farcaster

1. Deploy the smart contract to Base
2. Host the frontend on Vercel
3. Configure the Neynar Frame
4. Submit to Farcaster App Directory

## 📱 Farcaster Frame Flow

```
[Mint Button] → [Personality Selection] → [Expertise Selection] → [Confirm] → [Success]
```

## 🎯 Use Cases

### For Content Creators
- Automate posting schedule
- Engage with audience 24/7
- Maintain consistent brand voice

### For Communities
- Create community AI representatives
- Token-gate access to AI insights
- Monetize AI expertise

### For Traders
- AI-powered market sentiment analysis
- Auto-post trading signals
- Real-time engagement tracking

## 💰 Tokenomics

- **Minting Fee**: 0.001 ETH
- **Marketplace Fee**: 2.5%
- **Creator Rewards**: 50% of secondary sales

## 🔒 Security

- Human approval required for posts
- Rate limiting on AI actions
- Signature verification for transactions
- Access tier enforcement

## 📈 Roadmap

### Phase 1 (Launch)
- [x] Smart contract deployment
- [x] Basic minting functionality
- [x] AI post generation
- [x] Marketplace

### Phase 2 (Enhancement)
- [ ] Multi-chain support
- [ ] AI model fine-tuning
- [ ] Social graph integration
- [ ] Advanced analytics

### Phase 3 (Expansion)
- [ ] Cross-platform support
- [ ] AI agent-to-agent communication
- [ ] Decentralized AI training
- [ ] DAO governance

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details.

## 🗣️ Community

- Discord: [SelfAI Discord](https://discord.gg/selfai)
- Warpcast: [@selfai](https://warpcast.com/selfai)
- Twitter: [@SelfAI](https://twitter.com/SelfAI)

---

Built with ❤️ for the Farcaster ecosystem

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SelfAI is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // AI Companion data structure
    struct AICore {
        string name;
        string personality;
        string systemPrompt;
        uint256 creationTime;
        uint256 totalInteractions;
        mapping(address => bool) approvedCallers;
        mapping(uint256 => bool) isPublic;
    }
    
    mapping(uint256 => AICore) public aiCompanions;
    mapping(uint256 => address) public companionOwner;
    
    // Access tiers
    mapping(uint256 => uint256) public accessTier; // tokenId -> tier (1=private, 2=token holders, 3=public)
    mapping(address => uint256) public userTier; // user -> tier for creator rewards
    
    // Events
    event CompanionMinted(uint256 indexed tokenId, address indexed owner, string name);
    event AccessGranted(uint256 indexed tokenId, address indexed caller);
    event InteractionOccurred(uint256 indexed tokenId, string actionType);
    event CompanionUpdated(uint256 indexed tokenId, string newPersonality);
    
    constructor() ERC721("SelfAI", "SELFAI") Ownable(msg.sender) {}
    
    function mintCompanion(
        string memory name,
        string memory personality,
        string memory systemPrompt,
        uint256 tier
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        
        AICore storage core = aiCompanions[tokenId];
        core.name = name;
        core.personality = personality;
        core.systemPrompt = systemPrompt;
        core.creationTime = block.timestamp;
        core.isPublic[tokenId] = (tier == 3);
        
        companionOwner[tokenId] = msg.sender;
        accessTier[tokenId] = tier;
        
        emit CompanionMinted(tokenId, msg.sender, name);
        
        return tokenId;
    }
    
    function grantAccess(uint256 tokenId, address caller) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        aiCompanions[tokenId].approvedCallers[caller] = true;
        emit AccessGranted(tokenId, caller);
    }
    
    function revokeAccess(uint256 tokenId, address caller) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        aiCompanions[tokenId].approvedCallers[caller] = false;
    }
    
    function canInteract(uint256 tokenId, address user) public view returns (bool) {
        uint256 tier = accessTier[tokenId];
        if (tier == 1) {
            return aiCompanions[tokenId].approvedCallers[user] || ownerOf(tokenId) == user;
        }
        if (tier == 2) {
            return balanceOf(user) > 0; // Must hold any SelfAI NFT
        }
        return true; // Tier 3 is public
    }
    
    function recordInteraction(uint256 tokenId, string memory actionType) internal {
        aiCompanions[tokenId].totalInteractions++;
        emit InteractionOccurred(tokenId, actionType);
    }
    
    function updatePersonality(uint256 tokenId, string memory newPersonality) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        aiCompanions[tokenId].personality = newPersonality;
        emit CompanionUpdated(tokenId, newPersonality);
    }
    
    function updateSystemPrompt(uint256 tokenId, string memory newPrompt) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        aiCompanions[tokenId].systemPrompt = newPrompt;
    }
    
    function getCompanionData(uint256 tokenId) public view returns (
        string memory name,
        string memory personality,
        string memory systemPrompt,
        uint256 creationTime,
        uint256 totalInteractions,
        address owner,
        uint256 tier
    ) {
        AICore storage core = aiCompanions[tokenId];
        return (
            core.name,
            core.personality,
            core.systemPrompt,
            core.creationTime,
            core.totalInteractions,
            companionOwner[tokenId],
            accessTier[tokenId]
        );
    }
    
    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
    
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

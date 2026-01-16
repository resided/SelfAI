#!/bin/bash

echo "🏗️  CastMate Deployment Script"
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check prerequisites
echo -e "\n${YELLOW}📋 Checking prerequisites...${NC}"

command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js is required but not installed.${NC}" >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo -e "${RED}Python 3 is required but not installed.${NC}" >&2; exit 1; }

# Install frontend dependencies
echo -e "\n${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Install backend dependencies
echo -e "\n${YELLOW}🐍 Installing backend dependencies...${NC}"
cd backend
if command -v poetry &> /dev/null; then
    poetry install
else
    pip3 install -r requirements.txt
fi
cd ..

# Build frontend
echo -e "\n${YELLOW}🔨 Building frontend...${NC}"
cd frontend
npm run build
cd ..

# Deploy smart contract
echo -e "\n${YELLOW}⛓️  Deploying smart contract...${NC}"
echo "Contract deployment would happen here with:"
echo "  npx hardhat run scripts/deploy.js --network base"

echo -e "\n${GREEN}✅ Deployment preparation complete!${NC}"
echo -e "\nNext steps:"
echo "  1. Deploy the smart contract to Base"
echo "  2. Set environment variables"
echo "  3. Deploy frontend to Vercel"
echo "  4. Deploy backend to a server (Railway/Render/AWS)"
echo "  5. Submit your Frame to Neynar"

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Zama Survey dApp built with React and TypeScript that demonstrates Fully Homomorphic Encryption (FHE) capabilities using the Zama/Fhenix protocol. The application consists of:

- **Frontend**: React TypeScript app with xterm.js terminal interface for survey collection
- **Smart Contract**: Solidity contract using FHE to store encrypted survey responses on-chain
- **Blockchain Integration**: Hardhat development environment configured for Zama devnet

## Development Commands

### Frontend Development
```bash
npm start          # Start React development server (localhost:3000)
npm run build      # Build production React app
npm test           # Run React test suite
npm run eject      # Eject from Create React App (irreversible)
```

### Smart Contract Development
```bash
# From hardhat/ directory
npx hardhat compile                    # Compile Solidity contracts
npx hardhat run scripts/deploy.ts      # Deploy to local network
npx hardhat run scripts/deploy.ts --network zama  # Deploy to Zama devnet
npx hardhat test                       # Run contract tests (if any exist)
```

### Environment Setup
- Set `PRIVATE_KEY` environment variable for Zama devnet deployment
- Update `contractAddress` in `src/App.tsx` after deployment

## Architecture

### Frontend Structure
- **src/App.tsx**: Main application component handling wallet connection and smart contract interaction
- **src/components/Terminal.tsx**: xterm.js-based terminal interface for collecting survey responses
- **src/hooks/useWallet.ts**: Custom hook for MetaMask wallet integration using ethers.js
- **src/abi/ZamaSurvey.json**: Contract ABI for frontend-blockchain communication

### Smart Contract
- **hardhat/contracts/ZamaSurvey.sol**: FHE-enabled contract storing encrypted survey answers as `euint8[5]` arrays
- Uses Fhenix protocol imports: `@fhenixprotocol/contracts/FHE.sol` and `FHEUint.sol`
- Mapping structure: `address => euint8[5]` for user answers

### Key Dependencies
- **Frontend**: React 19, TypeScript, ethers.js v6, xterm.js, Tailwind CSS
- **Smart Contract**: Hardhat, Fhenix/Zama FHE libraries
- **Development**: Create React App, Hardhat toolbox

### FHE Integration
- Survey answers are converted to character codes and encrypted using `euint8` types
- Smart contract stores encrypted data that can only be computed on, not directly read
- Frontend handles plaintext collection and encoding before blockchain submission

### Network Configuration
- Zama devnet: `https://devnet.zama.ai` (chainId: 9001)
- Contract deployment requires funded wallet with ZAMA tokens
- MetaMask connection required for user interaction

## Development Notes

- The terminal interface collects 5 predefined survey questions about Zama and FHE
- All user responses are stored as encrypted data on-chain using homomorphic encryption
- Contract address must be updated in App.tsx after deployment
- Frontend styling uses Tailwind CSS with dark theme
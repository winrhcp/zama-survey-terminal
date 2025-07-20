# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a privacy-preserving survey application built with React and Zama's Fully Homomorphic Encryption (FHE) technology. The application consists of:

- **Frontend**: React TypeScript app with xterm.js terminal interface
- **Smart Contract**: Solidity contract using Zama's FHEVM for encrypted data storage
- **Blockchain**: Deploys to Zama devnet (chainId 9000)

## Development Commands

### Frontend Development
```bash
npm start                 # Start React development server (uses react-app-rewired)
npm run build            # Build production bundle (uses react-app-rewired)
npm test                 # Run test suite (uses react-app-rewired)
```

### Smart Contract Development
```bash
cd hardhat
npm install              # Install Hardhat dependencies
npx hardhat compile      # Compile Solidity contracts
npx hardhat clean        # Clean cache, artifacts, and typechain types
npx hardhat typechain    # Generate TypeScript types
npm run lint             # Run Solidity and TypeScript linting
npm run prettier:check   # Check code formatting
npm run prettier:write   # Format code with Prettier
npx hardhat run scripts/deploy.ts --network zama  # Deploy to Zama devnet
```

### Environment Setup
- Set `PRIVATE_KEY` environment variable for contract deployment
- Contract address must be updated in `src/App.tsx` after deployment

## Architecture

### Frontend Structure
- `src/App.tsx`: Main application with wallet connection and contract integration
- `src/components/Terminal.tsx`: Interactive terminal component using xterm.js
- `src/hooks/useWallet.ts`: MetaMask wallet connection hook
- `src/abi/ZamaSurvey.json`: Contract ABI for frontend integration

### Smart Contract
- `hardhat/contracts/ZamaSurvey.sol`: FHE-enabled survey contract
- Uses `@fhevm/solidity` for encrypted data types (`euint8`)
- Stores encrypted survey responses that remain private

### Key Dependencies
- **Frontend**: 
  - React 19.1.0
  - ethers.js 6.15.0
  - xterm.js 5.3.0 + xterm-addon-fit 0.8.0
  - Tailwind CSS 3.4.17
  - TypeScript 4.9.5
  - @zama-fhe/relayer-sdk 0.1.1
  - tfhe 1.3.1
  - react-app-rewired 2.2.1
- **Contract**: 
  - Hardhat 2.25.0
  - @fhevm/solidity 0.7.0
  - @fhevm/hardhat-plugin 0.0.1-0
  - @openzeppelin/contracts 5.0.0
  - @openzeppelin/contracts-confidential 0.2.0-rc.0
  - TypeScript 5.8.3
  - ESLint 9.31.0
  - Prettier 3.6.2
- **Network**: Zama devnet (https://devnet.zama.ai)

### FHE Integration
- Survey answers are encrypted client-side before submission
- Contract stores `euint8[5]` encrypted answers per user
- Data remains encrypted on-chain, enabling privacy-preserving analytics

### Development Notes
- Frontend and Hardhat use separate package.json files
- TypeScript configuration excludes hardhat directory from frontend builds
- Contract deployment script outputs address for manual frontend update
- Terminal component handles survey state and blockchain interaction
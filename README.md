# Zama Survey Terminal

A privacy-preserving survey application built with React and Zama's Fully Homomorphic Encryption (FHE) technology. This application allows users to submit survey responses that remain encrypted on-chain, enabling privacy-preserving analytics.

**Live Demo**: https://zama-survey-terminal.vercel.app/

## Features

- **Privacy-First**: Survey responses are encrypted client-side using FHE before blockchain submission
- **Terminal Interface**: Interactive terminal UI built with xterm.js
- **Smart Contract**: Solidity contract using Zama's FHEVM for encrypted data storage
- **Web3 Integration**: MetaMask wallet connection and Ethereum interaction
- **Zama FHEVM on Sepolia**: Deploys to Sepolia testnet with Zama's FHE capabilities (chainId 11155111)

## Architecture

### Frontend
- **React TypeScript** application with modern UI
- **xterm.js** for terminal interface
- **Tailwind CSS** for styling
- **ethers.js** for blockchain interaction
- **@zama-fhe/relayer-sdk** and **tfhe** for FHE operations

### Smart Contract
- **Solidity** contract using `@fhevm/solidity`
- Stores encrypted survey responses as `euint8[5]` arrays
- Data remains encrypted on-chain for privacy

### Blockchain
- Deploys to **Sepolia testnet** with **Zama's FHEVM** infrastructure
- ChainId: 11155111
- Uses Zama's FHE-enabled Sepolia configuration for encrypted computations

## Quick Start

### Prerequisites
- Node.js and npm
- MetaMask browser extension
- Sepolia testnet configuration in MetaMask (with Zama FHEVM support)

After deployment, update the contract address in `src/App.tsx`.

## Project Structure

```
├── src/
│   ├── App.tsx                    # Main application component
│   ├── components/Terminal.tsx    # Terminal interface component
│   ├── hooks/useWallet.ts        # MetaMask wallet hook
│   └── abi/ZamaSurvey.json       # Contract ABI
├── hardhat/
│   ├── contracts/ZamaSurvey.sol  # FHE survey contract
│   ├── scripts/deploy.ts         # Deployment script
│   └── hardhat.config.ts         # Hardhat configuration
```

## Key Dependencies

### Frontend
- React 19.1.0
- TypeScript 4.9.5
- ethers.js 6.15.0
- xterm.js 5.3.0
- Tailwind CSS 3.4.17
- @zama-fhe/relayer-sdk 0.1.1
- tfhe 1.3.1

### Smart Contract
- Hardhat 2.25.0
- @fhevm/solidity 0.7.0
- @fhevm/hardhat-plugin 0.0.1-0
- @openzeppelin/contracts 5.0.0

## How It Works

1. **Survey Setup**: The terminal presents survey questions to users
2. **Response Collection**: User answers are collected through the terminal interface
3. **FHE Encryption**: Responses are encrypted client-side using Zama's FHE technology
4. **Blockchain Storage**: Encrypted responses are submitted to the smart contract
5. **Privacy Preservation**: Data remains encrypted on-chain, enabling privacy-preserving analytics

## Network Configuration

Add Sepolia testnet to MetaMask for Zama FHEVM:
- **Network Name**: Sepolia Testnet (Zama FHEVM)
- **RPC URL**: https://rpc1.sepolia.org (or your preferred Sepolia RPC)
- **Chain ID**: 11155111
- **Currency Symbol**: ETH

Note: This project uses Zama's FHEVM infrastructure on Sepolia, which enables fully homomorphic encryption operations on the Ethereum Sepolia testnet.

## Testing

### Frontend Tests

The frontend uses Jest and React Testing Library for unit and integration tests.

```bash
# Run all frontend tests
npm test

# Run tests in watch mode (default)
npm test

# Run tests once and exit
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

**Test Structure:**
- Unit tests for React components using `@testing-library/react`
- Mock wallet interactions for isolated testing
- Integration tests for terminal functionality
- Jest configuration extends `react-app` preset

### Smart Contract Tests

The Hardhat environment supports comprehensive smart contract testing.

```bash
cd hardhat

# Run all contract tests
npm test
# or
npx hardhat test

# Run tests with gas reporting
npx hardhat test --reporter gas

# Run specific test file
npx hardhat test test/ZamaSurvey.test.js

# Run tests on specific network
npx hardhat test --network localhost
```

**Test Framework:**
- **Mocha** as test runner
- **Chai** for assertions
- **Hardhat Network** for blockchain simulation
- **Waffle** for contract testing utilities
- **Typechain** for type-safe contract interactions

**FHE Testing Considerations:**
- Mock FHE operations for unit tests
- Test encrypted data handling carefully
- Verify access control and permissions
- Test decryption oracle interactions

### Linting and Code Quality

```bash
# Frontend linting (automatic via react-scripts)
npm run build  # Includes linting

# Smart contract linting
cd hardhat
npm run lint              # Run all linting
npm run lint:sol          # Solidity linting only
npm run lint:ts           # TypeScript linting only

# Code formatting
npm run prettier:check    # Check formatting
npm run prettier:write    # Fix formatting
```

### Test Coverage

Generate coverage reports to ensure comprehensive testing:

```bash
# Frontend coverage
npm test -- --coverage --watchAll=false

# View coverage report
open coverage/lcov-report/index.html
```

### Running Tests in CI/CD

For automated testing in GitHub Actions or similar:

```bash
# Frontend tests (headless)
npm test -- --watchAll=false --coverage

# Smart contract tests
cd hardhat && npm test

# Full test suite
npm test -- --watchAll=false && cd hardhat && npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

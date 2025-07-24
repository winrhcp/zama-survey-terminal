import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum!);
      await provider.send("eth_requestAccounts", []);
    
    // Switch to Sepolia testnet
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: "11155111" } // Sepolia chainId: 11155111 (0xaa36a7)
      ]);
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await provider.send("wallet_addEthereumChain", [
            {
              chainId: "11155111",
              chainName: "Sepolia test network",
              rpcUrls: ["https://1rpc.io/sepolia"],
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              blockExplorerUrls: ["https://sepolia.etherscan.io/"],
            },
          ]);
        } catch (addError: any) {
          console.error("Failed to add Sepolia network:", addError);
          if (addError.code === 4001) {
            setError('Network addition rejected. Please add Sepolia network manually.');
          } else {
            setError('Failed to add Sepolia network. Please add it manually.');
          }
          return null;
        }
      } else {
        console.error("Failed to switch to Sepolia network:", switchError);
        if (switchError.code === 4001) {
          setError('Network switch rejected. Please switch to Sepolia network manually.');
        } else {
          setError('Failed to switch to Sepolia network. Please switch manually.');
        }
        return null;
      }
    }
    
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      return { provider, signer, addr };
    } catch (err: any) {
      // Handle user rejection
      if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
        setError('Connection rejected. Please connect your wallet to continue.');
      } else if (err.message?.includes('user rejected')) {
        setError('Connection rejected. Please connect your wallet to continue.');
      } else {
        setError('Failed to connect wallet. Please try again.');
        console.error('Wallet connection error:', err);
      }
      // Don't rethrow the error to prevent uncaught runtime errors
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return { account, connect, disconnect, error, isConnecting, clearError };
}

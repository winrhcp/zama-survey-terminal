import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connect = async () => {
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
        } catch (addError) {
          console.error("Failed to add Sepolia network:", addError);
          throw addError;
        }
      } else {
        console.error("Failed to switch to Sepolia network:", switchError);
        throw switchError;
      }
    }
    
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);
    return { provider, signer, addr };
  };

  const disconnect = () => {
    setAccount(null);
  };

  return { account, connect, disconnect };
}

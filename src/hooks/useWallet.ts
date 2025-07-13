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

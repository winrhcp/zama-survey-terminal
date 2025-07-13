import { useState } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);
    return { provider, signer, addr };
  };

  return { account, connect };
}

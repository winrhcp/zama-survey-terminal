import { useState, useEffect, useRef } from 'react';
import { useWallet } from './hooks/useWallet';
import { SurveyTerminal } from './components/Terminal';
import { ethers } from 'ethers';
import ZamaSurveyABI from './abi/ZamaSurvey.json';
import { createInstance, initSDK, SepoliaConfig } from '@zama-fhe/relayer-sdk/web';

const contractAddress = "0x1B09FF8082D9cE06048Fab90Ce2D33a65e150Dcd";

// Global cache for FHE SDK initialization
let fheSDKCache: { initialized: boolean; instance: any } | null = null;

function App() {
  const { account, connect, disconnect, error: walletError, isConnecting, clearError } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [fheReady, setFheReady] = useState(false);
  const [fheInstance, setFheInstance] = useState<any>(null);
  const initializingRef = useRef(false);

  // Initialize contract and FHE when account is connected
  useEffect(() => {
    const initContract = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(contractAddress, ZamaSurveyABI, signer);
          setContract(contractInstance);
          
          // Check if FHE SDK is already cached
          if (fheSDKCache && fheSDKCache.initialized) {
            console.log('Using cached FHE SDK instance');
            setFheInstance(fheSDKCache.instance);
            setFheReady(true);
            return;
          }
          
          // Prevent multiple simultaneous initializations
          if (initializingRef.current) {
            return;
          }
          
          initializingRef.current = true;
          
          // Initialize FHE SDK
          console.log('Initializing FHE SDK...');
          await initSDK();
          
          // Create FHE instance with Sepolia config
          const fheConfig = {
            ...SepoliaConfig,
            network: window.ethereum
          };
          
          const instance = await createInstance(fheConfig);
          
          // Cache the initialized instance
          fheSDKCache = {
            initialized: true,
            instance: instance
          };
          
          setFheInstance(instance);
          setFheReady(true);
          console.log('FHE SDK initialized and cached successfully');
          
        } catch (error) {
          console.error('Error initializing contract or FHE:', error);
          setFheReady(false);
          fheSDKCache = null;
        } finally {
          initializingRef.current = false;
        }
      } else {
        setContract(null);
        setFheInstance(null);
        setFheReady(false);
      }
    };

    initContract();
  }, [account]);

  const handleSubmitAnswers = async (answers: string[]): Promise<void> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    if (!fheReady || !fheInstance) {
      throw new Error('FHE not ready');
    }

    try {
      // Extract the letters (A, B, C, D) from each answer and encode them
      const answerLetters = answers.map(answer => answer.charAt(0));
      const encoded = answerLetters.map(letter => letter.charCodeAt(0));

      console.log('Submitting all answers:', answerLetters);
      console.log('Encoded values:', encoded);
      
      // Use the FHE instance to encrypt the answers
      console.log('Encrypting answers with FHE SDK...');
      
      // Create encrypted input for the contract
      const input = fheInstance.createEncryptedInput(contractAddress, account);
      
      // Add each encoded answer to the input
      for (let i = 0; i < encoded.length; i++) {
        input.add8(encoded[i]);
      }
      
      // Encrypt the input
      const encryptedData = await input.encrypt();
      const encryptedAnswers = encryptedData.handles;
      const inputProofs = [encryptedData.inputProof, encryptedData.inputProof, encryptedData.inputProof, encryptedData.inputProof, encryptedData.inputProof];
      
      console.log('FHE encrypted answers prepared, calling contract...');
      console.log('Encrypted inputs:', encryptedAnswers);
      console.log('Input proofs:', inputProofs);
      
      // Call the contract with encrypted answers
      const tx = await contract.submitAnswers(encryptedAnswers, inputProofs);
      
      console.log('Transaction submitted:', tx.hash);
      
      // Wait for transaction confirmation
      await tx.wait();
      
      console.log('All answers submitted successfully to blockchain');
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-orange-950 to-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,193,7,0.3),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-100 to-orange-300 bg-clip-text text-transparent mb-4">
            ZAMA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Privacy-Preserving Survey Terminal
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6 rounded-full" />
        </div>
        
        {/* Main content */}
        <div className="w-full max-w-4xl">
          {!account ? (
            <div className="text-center">
              <div className="mb-8">
                <p className="text-gray-400 mb-6 text-lg">
                  Connect your wallet to participate in our Fully Homomorphic Encryption survey
                </p>
              </div>
              {walletError && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-red-400 text-sm">{walletError}</p>
                    <button 
                      onClick={clearError}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              <button 
                onClick={connect}
                disabled={isConnecting}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black transition-all duration-300 ease-out bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl hover:from-yellow-300 hover:to-orange-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </span>
                {isConnecting && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium hover:bg-yellow-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    <svg className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-gray-800/90 backdrop-blur-sm border border-gray-600/30 rounded-lg shadow-xl z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-600/30">
                          {account}
                        </div>
                        <button
                          onClick={() => {
                            disconnect();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-colors"
                        >
                          Disconnect Wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {fheReady ? (
                <SurveyTerminal 
                  onSubmit={handleSubmitAnswers} 
                  contract={contract}
                  account={account}
                />
              ) : (
                <div className="text-center">
                  <p className="text-yellow-400 mb-4">Initializing FHE encryption...</p>
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by Zama's Fully Homomorphic Encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

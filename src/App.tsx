import { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import { SurveyTerminal } from './components/Terminal';
import { ethers } from 'ethers';
import ZamaSurveyABI from './abi/ZamaSurvey.json';

const contractAddress = "0xYourContractAddressHere";

function App() {
  const { account, connect, disconnect } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (answers: string[]) => {
    const { signer } = await connect();
    const contract = new ethers.Contract(contractAddress, ZamaSurveyABI, signer);

    // Convert answers (e.g., A, B, C...) to euint8 array
    const encoded = answers.map((a) => a.charCodeAt(0));
    await contract.submitAnswers(encoded);
    alert("Answers submitted to FHEVM!");
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
              <button 
                onClick={connect} 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black transition-all duration-300 ease-out bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl hover:from-yellow-300 hover:to-orange-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Connect MetaMask</span>
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
              <SurveyTerminal onSubmit={handleSubmit} />
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

import { useWallet } from './hooks/useWallet';
import { SurveyTerminal } from './components/Terminal';
import { ethers } from 'ethers';
import ZamaSurveyABI from './abi/ZamaSurvey.json';

const contractAddress = "0xYourContractAddressHere";

function App() {
  const { account, connect } = useWallet();

  const handleSubmit = async (answers: string[]) => {
    const { provider, signer } = await connect();
    const contract = new ethers.Contract(contractAddress, ZamaSurveyABI, signer);

    // Convert answers (e.g., A, B, C...) to euint8 array
    const encoded = answers.map((a) => a.charCodeAt(0));
    await contract.submitAnswers(encoded);
    alert("Answers submitted to FHEVM!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Zama Survey dApp</h1>
      {!account && (
        <button onClick={connect} className="px-4 py-2 bg-blue-600 rounded">Connect MetaMask</button>
      )}
      {account && (
        <SurveyTerminal onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;

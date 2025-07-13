import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

interface TerminalProps {
  onSubmit: (answers: string[]) => void;
}

export const SurveyTerminal: React.FC<TerminalProps> = ({ onSubmit }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const questions = [
    {
      question: "1. What is Zama?",
      choices: [
        "A. A privacy-preserving blockchain protocol",
        "B. A cryptocurrency exchange",
        "C. A smart contract language",
        "D. A wallet application"
      ]
    },
    {
      question: "2. What is FHE?",
      choices: [
        "A. Fast Hash Encryption", 
        "B. Fully Homomorphic Encryption",
        "C. Functional Header Extension",
        "D. Federated Hybrid Exchange"
      ]
    },
    {
      question: "3. What can FHEVM do?",
      choices: [
        "A. Only store encrypted data",
        "B. Decrypt data automatically", 
        "C. Compute on encrypted data without decryption",
        "D. Compress blockchain data"
      ]
    },
    {
      question: "4. Why use FHE in blockchain?",
      choices: [
        "A. Faster transaction processing",
        "B. Lower gas fees",
        "C. Privacy-preserving computations",
        "D. Better user interface"
      ]
    },
    {
      question: "5. What's your favorite Zama feature?",
      choices: [
        "A. Privacy by design",
        "B. Developer tools",
        "C. Performance optimizations", 
        "D. Community support"
      ]
    }
  ];

  useEffect(() => {
    if (!terminalRef.current) return;
    
    let term: Terminal | null = null;
    let currentQuestionIndex = 0;
    let selectedChoice = 0;
    const answers: string[] = [];

    const displayQuestion = () => {
      if (!term) return;
      
      if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        term.clear();
        term.write("Welcome to Zama Survey Terminal\r\n\r\n");
        term.write(q.question + "\r\n\r\n");
        
        q.choices.forEach((choice, index) => {
          const prefix = index === selectedChoice ? "> " : "  ";
          const style = index === selectedChoice ? "\x1b[7m" : "\x1b[0m";
          term!.write(prefix + style + choice + "\x1b[0m\r\n");
        });
        
        term.write("\r\nUse W/S to navigate, Enter to select\r\n");
      } else {
        onSubmit(answers);
      }
    };

    try {
      term = new Terminal({
        cols: 80,
        rows: 20,
        theme: {
          background: 'transparent',
          foreground: '#fbbf24',
          cursor: '#f59e0b'
        }
      });

      term.open(terminalRef.current);
      
      term.onKey(({ key, domEvent }) => {
        if (domEvent.key === 'Enter') {
          answers.push(questions[currentQuestionIndex].choices[selectedChoice]);
          currentQuestionIndex++;
          selectedChoice = 0;
          displayQuestion();
        } else if (domEvent.key === 'ArrowUp' || domEvent.key === 'w' || domEvent.key === 'W') {
          if (selectedChoice > 0) {
            selectedChoice--;
            displayQuestion();
          }
        } else if (domEvent.key === 'ArrowDown' || domEvent.key === 's' || domEvent.key === 'S') {
          if (selectedChoice < questions[currentQuestionIndex]?.choices.length - 1) {
            selectedChoice++;
            displayQuestion();
          }
        }
      });

      displayQuestion();
    } catch (error) {
      console.error('Terminal failed:', error);
    }

    return () => {
      if (term) {
        term.dispose();
      }
    };
  }, [onSubmit]);

  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-yellow-950/50 via-orange-950/50 to-black rounded-xl border border-yellow-700/30 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-b border-yellow-600/20">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-yellow-300 text-sm font-medium ml-4">Zama Survey Terminal</span>
          </div>
          <div className="text-yellow-400 text-xs font-mono">FHEVM</div>
        </div>
        
        <div className="p-4">
          <div 
            ref={terminalRef} 
            className="w-full h-96 cursor-text"
            style={{
              minHeight: '400px'
            }}
            tabIndex={0}
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 via-orange-600/5 to-yellow-600/5 rounded-xl pointer-events-none"></div>
    </div>
  );
};
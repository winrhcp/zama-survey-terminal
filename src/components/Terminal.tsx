import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { ethers } from 'ethers';
import 'xterm/css/xterm.css';

interface TerminalProps {
  onSubmit: (answers: string[]) => Promise<void>;
  contract: ethers.Contract | null;
  account: string | null;
}

export const SurveyTerminal: React.FC<TerminalProps> = ({ onSubmit, contract, account }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
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

  // Check user's progress from smart contract
  const checkUserProgress = async () => {
    if (!contract || !account) {
      setIsLoading(false);
      return;
    }

    try {
      // Check if user has already submitted all answers
      const hasCompleted = await contract.hasSubmitted(account);
      
      if (hasCompleted) {
        setHasSubmitted(true);
        setCurrentQuestionIndex(5); // All questions answered
      } else {
        // If user hasn't submitted, they are starting from the beginning
        setCurrentQuestionIndex(0);
        setHasSubmitted(false);
      }
    } catch (error) {
      console.error('Error checking user progress:', error);
      // If there's an error, assume user hasn't started
      setCurrentQuestionIndex(0);
      setHasSubmitted(false);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    checkUserProgress();
  }, [contract, account]);

  useEffect(() => {
    if (!terminalRef.current || isLoading) return;
    
    let term: Terminal | null = null;
    let selectedChoice = 0;

    const displayThankYou = () => {
      if (!term) return;
      
      term.clear();
      term.write("\r\n");
      term.write("🎉 Thank you for completing the Zama Survey! 🎉\r\n\r\n");
      term.write("Your responses have been securely stored using\r\n");
      term.write("Fully Homomorphic Encryption (FHE) on the blockchain.\r\n\r\n");
      term.write("✨ Key benefits of your encrypted responses:\r\n");
      term.write("   • Complete privacy - your answers are encrypted\r\n");
      term.write("   • Tamper-proof - stored on immutable blockchain\r\n");
      term.write("   • Computational privacy - can be analyzed without decryption\r\n\r\n");
      term.write("🔐 Your data remains confidential while contributing to\r\n");
      term.write("   valuable insights about the Zama ecosystem.\r\n\r\n");
      term.write("Thank you for being part of the privacy-preserving future!\r\n");
    };

    const displayQuestion = () => {
      if (!term) return;
      
      if (hasSubmitted) {
        displayThankYou();
        return;
      }
      
      if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        term.clear();
        term.write("Welcome to Zama Survey Terminal\r\n\r\n");
        
        // Show progress
        term.write(`Progress: ${currentQuestionIndex + 1}/5\r\n\r\n`);
        
        // Show previously answered questions
        if (answers.length > 0) {
          term.write("Previous answers:\r\n");
          for (let i = 0; i < currentQuestionIndex; i++) {
            if (answers[i]) {
              term.write(`  ${i + 1}. ${answers[i].charAt(0)}\r\n`);
            }
          }
          term.write("\r\n");
        }
        
        term.write(q.question + "\r\n\r\n");
        
        // Focus the terminal after displaying the question
        setTimeout(() => {
          term?.focus();
        }, 0);
        
        q.choices.forEach((choice, index) => {
          const prefix = index === selectedChoice ? "> " : "  ";
          const style = index === selectedChoice ? "\x1b[7m" : "\x1b[0m";
          term!.write(prefix + style + choice + "\x1b[0m\r\n");
        });
        
        term.write("\r\nW/S or ↑↓: Select • A/D or ←→: Navigate questions • Enter: Confirm\r\n");
      } else {
        displayThankYou();
      }
    };

    const initializeTerminal = () => {
      if (!terminalRef.current || term) return;
      
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
          if (hasSubmitted || currentQuestionIndex >= questions.length) return; // Don't allow input if survey is completed
          
          if (domEvent.key === 'Enter') {
            if (currentQuestionIndex < questions.length && term) {
              const selectedAnswer = questions[currentQuestionIndex].choices[selectedChoice];
              
              // Store the answer
              setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestionIndex] = selectedAnswer;
                return newAnswers;
              });
              
              // Move to next question or submit all answers
              const nextIndex = currentQuestionIndex + 1;
              if (nextIndex >= questions.length) {
                // All questions answered, submit to contract
                term.clear();
                term.write("Submitting all answers to blockchain...\r\n");
                term.write("Please wait...\r\n");
                
                const allAnswers = [...answers];
                allAnswers[currentQuestionIndex] = selectedAnswer;
                
                onSubmit(allAnswers)
                  .then(() => {
                    setHasSubmitted(true);
                    setCurrentQuestionIndex(nextIndex);
                  })
                  .catch((error) => {
                    console.error('Error submitting answers:', error);
                    if (term) {
                      term.clear();
                      term.write("Error submitting answers. Please try again.\r\n");
                      term.write("Press any key to continue...\r\n");
                      
                      // Redisplay current question after error
                      setTimeout(() => {
                        displayQuestion();
                      }, 2000);
                    }
                  });
              } else {
                // Move to next question
                setCurrentQuestionIndex(nextIndex);
                // Focus will be handled by displayQuestion after state update
              }
            }
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
          } else if (domEvent.key === 'ArrowLeft' || domEvent.key === 'a' || domEvent.key === 'A') {
            // Go to previous question if not on first question
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(currentQuestionIndex - 1);
              selectedChoice = 0; // Reset selection
              // Set selected choice to the previously answered choice if exists
              if (answers[currentQuestionIndex - 1]) {
                const prevAnswer = answers[currentQuestionIndex - 1];
                const prevChoiceIndex = questions[currentQuestionIndex - 1].choices.findIndex(choice => choice === prevAnswer);
                if (prevChoiceIndex !== -1) {
                  selectedChoice = prevChoiceIndex;
                }
              }
            }
          } else if (domEvent.key === 'ArrowRight' || domEvent.key === 'd' || domEvent.key === 'D') {
            // Go to next question if answer exists for current question
            if (currentQuestionIndex < questions.length - 1 && answers[currentQuestionIndex]) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              selectedChoice = 0; // Reset selection
              // Set selected choice to the previously answered choice if exists
              if (answers[currentQuestionIndex + 1]) {
                const nextAnswer = answers[currentQuestionIndex + 1];
                const nextChoiceIndex = questions[currentQuestionIndex + 1].choices.findIndex(choice => choice === nextAnswer);
                if (nextChoiceIndex !== -1) {
                  selectedChoice = nextChoiceIndex;
                }
              }
            }
          }
        });

        displayQuestion();
      } catch (error) {
        console.error('Terminal failed:', error);
      }
    };

    // Wait for container to have dimensions
    const container = terminalRef.current;
    if (container && (container.offsetWidth === 0 || container.offsetHeight === 0)) {
      const observer = new ResizeObserver(() => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
          observer.disconnect();
          initializeTerminal();
        }
      });
      observer.observe(container);
      return () => {
        observer.disconnect();
        if (term) {
          term.dispose();
        }
      };
    } else {
      initializeTerminal();
    }

    return () => {
      if (term) {
        term.dispose();
      }
    };
  }, [onSubmit, currentQuestionIndex, hasSubmitted, isLoading]);


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
            <div className="flex items-center space-x-2 ml-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-yellow-300 text-sm font-medium">Zama Survey Terminal</span>
            </div>
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
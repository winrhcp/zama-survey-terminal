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

  const totalQuestions = questions.length;
  const answeredCount = answers.filter(Boolean).length;
  const activeStep = hasSubmitted ? totalQuestions : Math.min(currentQuestionIndex + 1, totalQuestions);
  const rawProgress = totalQuestions === 0 ? 0 : hasSubmitted ? 100 : Math.round((answeredCount / totalQuestions) * 100);
  const progressValue = Math.max(0, Math.min(rawProgress, 100));
  const progressLabel = hasSubmitted ? 'All answers submitted' : `Question ${activeStep} of ${totalQuestions}`;
  const sessionStatus = hasSubmitted ? 'Survey complete' : 'Encrypted session active';
  const sessionStatusClass = hasSubmitted ? 'text-green-300' : 'text-yellow-300';
  useEffect(() => {
    const fetchProgress = async () => {
      if (!contract || !account) {
        setIsLoading(false);
        return;
      }

      try {
        const hasCompleted = await contract.hasSubmitted(account);

        if (hasCompleted) {
          setHasSubmitted(true);
          setCurrentQuestionIndex(totalQuestions);
        } else {
          setCurrentQuestionIndex(0);
          setHasSubmitted(false);
        }
      } catch (error) {
        console.error('Error checking user progress:', error);
        setCurrentQuestionIndex(0);
        setHasSubmitted(false);
      }

      setIsLoading(false);
    };

    fetchProgress();
  }, [account, contract, totalQuestions]);

  useEffect(() => {
    if (!terminalRef.current || isLoading) return;

    let term: Terminal | null = null;
    let selectedChoice = 0;

    const displayThankYou = () => {
      if (!term) return;

      term.clear();
      term.write("\r\n");
      term.write("============================================\r\n");
      term.write("*** Thank you for completing the Zama Survey! ***\r\n");
      term.write("============================================\r\n\r\n");
      term.write("Your responses are sealed with Fully Homomorphic Encryption.\r\n");
      term.write("They remain private, verifiable, and ready for encrypted analysis.\r\n\r\n");
      term.write("Key benefits of your encrypted responses:\r\n");
      term.write("- Complete privacy: answers stay encrypted end to end\r\n");
      term.write("- Tamper resistance: stored on an immutable ledger\r\n");
      term.write("- Secure insights: computations run without decryption\r\n\r\n");
      term.write("Thank you for helping shape privacy-first applications.\r\n");
    };

    const displayQuestion = () => {
      if (!term) return;

      if (hasSubmitted) {
        displayThankYou();
        return;
      }

      if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        const questionNumber = currentQuestionIndex + 1;
        term.clear();
        term.write("=== Zama Survey Console ===\r\n\r\n");
        term.write(`Progress: ${questionNumber}/${questions.length}\r\n`);
        term.write("--------------------------------------------\r\n\r\n");

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
          const style = index === selectedChoice ? "\u001b[7m" : "\u001b[0m";
          term!.write(prefix + style + choice + "\u001b[0m\r\n");
        });

        term.write("\r\nControls:\r\n");
        term.write("- W or Arrow Up: move up\r\n");
        term.write("- S or Arrow Down: move down\r\n");
        term.write("- A or Arrow Left: previous question\r\n");
        term.write("- D or Arrow Right: next question\r\n");
        term.write("- Enter: confirm selection\r\n");
      } else {
        displayThankYou();
      }
    };

    const initializeTerminal = () => {
      if (!terminalRef.current || term) return;

      try {
        term = new Terminal({
          cols: 84,
          rows: 22,
          allowTransparency: true,
          cursorBlink: true,
          cursorStyle: 'block',
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, Menlo, monospace',
          theme: {
            background: '#05050500',
            foreground: '#f8fafc',
            cursor: '#facc15',
            selectionBackground: '#facc1540',
            black: '#0f172a',
            yellow: '#facc15',
            brightYellow: '#fde047',
            brightGreen: '#bbf7d0'
          }
        });

        term.open(terminalRef.current);
        term.focus();

        term.onKey(({ domEvent }) => {
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
                  .catch(() => {
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
    <div className="relative overflow-hidden rounded-2xl border border-yellow-700/40 bg-slate-950/70 shadow-2xl shadow-yellow-900/30 backdrop-blur">
      <div className="absolute -inset-20 -z-10 bg-gradient-to-br from-yellow-600/10 via-transparent to-orange-500/10 blur-3xl" aria-hidden="true"></div>
      <div className="relative">
        <div className="flex flex-col gap-4 border-b border-yellow-700/30 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-slate-950/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">Zama Survey Terminal</p>
              <p className={`text-xs font-mono ${sessionStatusClass}`}>{sessionStatus}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-yellow-200">FHEVM Shielded Mode</p>
            {account && (
              <p className="text-[11px] font-mono text-yellow-500/80">Wallet {account.slice(0, 6)}...{account.slice(-4)}</p>
            )}
          </div>
        </div>

        <div className="px-6 pt-5">
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-yellow-200/90">
            <span>{progressLabel}</span>
            <span>{progressValue}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-yellow-900/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 transition-all duration-700"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[minmax(0,240px)_1fr]">
          <div className="space-y-4">
            <div className="rounded-xl border border-yellow-700/30 bg-yellow-950/10 p-4 shadow-inner">
              <h3 className="text-sm font-semibold text-yellow-200">Navigation tips</h3>
              <ul className="mt-3 space-y-2 text-xs font-mono text-yellow-100/80">
                <li>- Use W or Arrow Up to move up</li>
                <li>- Use S or Arrow Down to move down</li>
                <li>- Use A or Arrow Left to revisit a question</li>
                <li>- Use D or Arrow Right to advance</li>
                <li>- Press Enter to lock in your choice</li>
              </ul>
            </div>
            <div className="rounded-xl border border-yellow-700/20 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-yellow-200">Encrypted progress</h3>
              <p className="mt-2 text-xs text-gray-300">
                Each answer is encrypted locally before it leaves your browser. Only encrypted data is sent to the smart contract.
              </p>
              <p className="mt-3 text-[11px] font-mono text-yellow-400">
                {answeredCount} of {totalQuestions} answers stored.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-yellow-500/15 via-transparent to-orange-500/15 blur-2xl" aria-hidden="true"></div>
            <div
              ref={terminalRef}
              className="relative h-[420px] w-full cursor-text overflow-hidden rounded-xl border border-yellow-700/40 bg-black/80 shadow-2xl shadow-yellow-900/30"
              style={{ minHeight: '420px' }}
              tabIndex={0}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};



import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalProps {
  onSubmit: (answers: string[]) => void;
}

export const SurveyTerminal: React.FC<TerminalProps> = ({ onSubmit }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const answers: string[] = [];
  const questions = [
    "1. What is Zama?",
    "2. What is FHE?",
    "3. What can FHEVM do?",
    "4. Why use FHE in blockchain?",
    "5. What's your favorite Zama feature?"
  ];

  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current!);
    fitAddon.fit();

    let i = 0;

    const askNext = () => {
      if (i < questions.length) {
        term.write(`\r\n${questions[i]}\r\n> `);
      } else {
        onSubmit(answers);
      }
    };

    let currentInput = "";
    term.onData(e => {
      if (e.charCodeAt(0) === 13) { // Enter
        answers.push(currentInput.trim());
        currentInput = "";
        i++;
        askNext();
      } else {
        currentInput += e;
        term.write(e);
      }
    });

    term.write("Welcome to Zama Survey Terminal\r\n");
    askNext();
  }, []);

  return <div ref={terminalRef} className="w-full h-96 bg-black rounded" />;
};

// Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { simulateTyping } from './terminalHelpers';
import {
  TerminalContainer,
  TerminalHeader,
  Circle,
  TerminalBody,
  TerminalOutputArea,
  CommandLine,
  Prompt,
  InputText,
  CommandOutput,
  TerminalInput,
  HelpPanel,
  BlinkingCursor
} from './Styling';

import useMetadataHandler from './MetaDataHandler';
import usePredictHandler from './PredictHandler';
import ResultsHandler from './ResultsHandler';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingOutput, setTypingOutput] = useState(null);
  const [showTerminal, setShowTerminal] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeMode, setActiveMode] = useState(null);
  const [allCrimes, setAllCrimes] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const terminalRef = useRef(null);

  const simulateTypingWrapper = (text, color = '#f8f8f2', onFinish) => {
    simulateTyping(text, color, onFinish, terminalRef, setTypingOutput, setIsTyping, setHistory);
  };

  const quitMode = () => {
    setActiveMode(null);
    simulateTypingWrapper('Exited current mode.', '#ff79c6');
  };

  const { startMetadataFlow, handleInput: handleMetadataInput } = useMetadataHandler({
    simulateTyping: simulateTypingWrapper,
    quitMode,
    setAllCrimes
  });

  const { handlePredict } = usePredictHandler({ simulateTyping: simulateTypingWrapper });

  useEffect(() => {
    simulateTypingWrapper("Welcome to Crime Predict Terminal Interface.\nType 'help' to see available commands.", '#8be9fd');
  }, []);

  useEffect(() => {
    if (terminalRef.current && !isTyping) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typingOutput, isTyping]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, { type: 'input', value: trimmed }]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      if (!activeMode) {
        processCommand(trimmed);
      } else if (activeMode === 'metadata') {
        handleMetadataInput(trimmed);
      }

      setInput('');
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0 && !activeMode) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (!activeMode) {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  const processCommand = (cmd) => {
    const lower = cmd.toLowerCase();

    switch (lower) {
      case 'help':
        simulateTypingWrapper(`Available commands:\n- predict\n- results\n- metadata\n- clear\n- quit\n- exit\n- about\n- help`, '#8be9fd');
        break;
      case 'about':
        simulateTypingWrapper(`This is a terminal-style interface for a crime prediction system.`, '#8be9fd');
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        simulateTypingWrapper('Goodbye! Closing terminal...', '#ff5555', () => {
          setTimeout(() => setShowTerminal(false), 1000);
        });
        break;
      case 'predict':
        handlePredict();
        break;
      case 'results':
        setShowMap(true);
        break;
      case 'metadata':
        setActiveMode('metadata');
        startMetadataFlow();
        break;
      case 'quit':
        quitMode();
        break;
      default:
        simulateTypingWrapper(`Unknown command: ${cmd}\nType 'help' for a list of commands.`, '#ff5555');
    }
  };

  return (
    <TerminalContainer $show={showTerminal}>
      <TerminalHeader>
        <Circle color="#ff5555" onClick={() => (activeMode ? quitMode() : processCommand('exit'))} />
        <Circle color="#f1fa8c" onClick={() => (activeMode ? quitMode() : setHistory([]))} />
        <Circle color="#50fa7b" />
      </TerminalHeader>

      <TerminalBody>
        <TerminalOutputArea ref={terminalRef}>
          {history.map((entry, index) =>
            entry.type === 'input' ? (
              <CommandLine key={index}>
                {!activeMode && <Prompt>$</Prompt>}
                <InputText>{entry.value}</InputText>
              </CommandLine>
            ) : (
              <CommandOutput key={index} color={entry.color}>
                {entry.value}
              </CommandOutput>
            )
          )}
          {typingOutput !== null && <CommandOutput color="#8be9fd">{typingOutput}</CommandOutput>}
          {!isTyping && (
            <CommandLine>
              {!activeMode && <Prompt>$</Prompt>}
              <TerminalInput
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
              />
              <BlinkingCursor>|</BlinkingCursor>
            </CommandLine>
          )}
        </TerminalOutputArea>

        <HelpPanel>
          Available commands:
          {'\n'}- predict
          {'\n'}- results
          {'\n'}- metadata
          {'\n'}- clear
          {'\n'}- quit
          {'\n'}- exit
          {'\n'}- about
          {'\n'}- help
        </HelpPanel>

        {showMap && (
          <ResultsHandler
            simulateTyping={simulateTypingWrapper}
            onClose={() => setShowMap(false)}
          />
        )}
      </TerminalBody>
    </TerminalContainer>
  );
};

export default Dashboard;

// Terminal.styles.js
import styled, { keyframes } from 'styled-components';

export const TerminalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282a36;
  font-family: 'Ubuntu Mono', monospace;
  color: #f8f8f2;
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
`;

export const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #44475a;
  border-bottom: 1px solid #000;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => props.color};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

export const TerminalBody = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const TerminalOutputArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const CommandLine = styled.div`
  display: flex;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const Prompt = styled.span`
  color: #bd93f9;
  margin-right: 5px;
`;

export const InputText = styled.span`
  color: #ffb86c;
`;

export const CommandOutput = styled.pre`
  margin: 6px 0;
  color: ${(props) => props.color || '#f8f8f2'};
`;

export const TerminalInput = styled.input`
  background: transparent;
  border: none;
  color: #ffb86c;
  font-size: 16px;
  width: 100%;
  outline: none;
  font-family: 'Ubuntu Mono', monospace;
  caret-color: #ffb86c;
`;

export const HelpPanel = styled.div`
  width: 300px;
  background-color: #44475a;
  color: #8be9fd;
  font-size: 14px;
  padding: 20px;
  border-left: 1px solid #000;
  white-space: pre-wrap;
  overflow-y: auto;
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

export const BlinkingCursor = styled.span`
  font-weight: bold;
  color: #ffb86c;
  margin-left: 3px;
  animation: ${blink} 1s step-start infinite;
`;

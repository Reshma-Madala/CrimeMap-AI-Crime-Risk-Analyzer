export const simulateTyping = (
  text,
  color = '#f8f8f2',
  onFinish,
  terminalRef,
  setTypingOutput,
  setIsTyping,
  setHistory
) => {
  const chars = text.split('');
  let i = 0;
  setTypingOutput('');
  setIsTyping(true);

  const interval = setInterval(() => {
    if (i < chars.length) {
      setTypingOutput((prev) => (prev || '') + chars[i]);
      i++;
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    } else {
      clearInterval(interval);
      setIsTyping(false);
      setTypingOutput(null);
      setHistory((prev) => [
        ...prev,
        { type: 'output', value: text, color }
      ]);
      if (onFinish) onFinish();
    }
  }, 10);
};

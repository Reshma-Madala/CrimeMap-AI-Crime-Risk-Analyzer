// PredictHandler.jsx
const usePredictHandler = ({ simulateTyping }) => {
  const handlePredict = () => {
    simulateTyping('Predicting crime... [stub - integrate ML backend]', '#a1ef8a');
  };

  return { handlePredict };
};

export default usePredictHandler;

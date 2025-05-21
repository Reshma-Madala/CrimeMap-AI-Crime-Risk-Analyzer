// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #282a36;
    font-family: 'Ubuntu Mono', monospace;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

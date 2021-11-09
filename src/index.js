import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import App from './App';
import SWRProvider from './core/SWRProvider';
import reportWebVitals from './reportWebVitals';

import './styles/index.css';

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <SWRProvider>
      <App />
    </SWRProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

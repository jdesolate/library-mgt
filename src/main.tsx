import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);

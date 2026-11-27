import React from 'react';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

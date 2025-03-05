import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS dosyasını import et
import App from './App'; // App component'ini import et

const rootElement = document.getElementById('root');

// React 18 ile birlikte root rendering yöntemi:
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

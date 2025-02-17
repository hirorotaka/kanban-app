import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NavItemProvider from './context/NavItemContext.tsx';
import { BoardProvider } from './context/BoardContext.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavItemProvider>
      <BoardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BoardProvider>
    </NavItemProvider>
  </React.StrictMode>
);

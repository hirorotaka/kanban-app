import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import NavItemProvider from './context/NavItemContext.tsx';
import { BoardProvider } from './context/BoardContext.tsx';

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

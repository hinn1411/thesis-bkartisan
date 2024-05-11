import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './translation/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <React.Suspense fallback="loading">
      <App />
      <ToastContainer position="top-right" autoClose={2000} draggable={true} />
    </React.Suspense>
  
);

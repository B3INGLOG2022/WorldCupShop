import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Offline from './components/Offline/Offline';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Offline></Offline>
  </React.StrictMode>
);


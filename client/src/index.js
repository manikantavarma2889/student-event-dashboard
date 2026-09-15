import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './accessibility.css';
import App from './App.js';

function AccessibilityBootstrap() {
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.setAttribute('id', 'main-content');
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('tabindex', '-1');
    }
  });

  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={() => document.getElementById('main-content')?.focus()}
    >
      Skip to main content
    </a>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccessibilityBootstrap />
    <App />
  </React.StrictMode>
);

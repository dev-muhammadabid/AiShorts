// Imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

// Get the root DOM node where React app will mount
const container = document.getElementById('root');

// Create React root and render app with routing and strict mode enabled
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

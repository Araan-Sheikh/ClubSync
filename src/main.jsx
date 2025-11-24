import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ClubsProvider } from './contexts/ClubsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ClubsProvider>
        <App />
      </ClubsProvider>
    </AuthProvider>
  </StrictMode>,
);

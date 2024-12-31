import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/reset.css';
import './styles/index.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </StrictMode>,
);

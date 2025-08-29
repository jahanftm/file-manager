import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.scss';
import './styles/global.scss';
import App from './App';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>  // Comment out to prevent double alerts in development
    <App />
  // </StrictMode>
)

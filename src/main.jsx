import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserPreferencesProvider } from './hooks/useUserPreferences.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserPreferencesProvider>
        <App />
      </UserPreferencesProvider>
    </BrowserRouter>
  </StrictMode>,
)

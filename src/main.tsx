import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ✅ On définit ici le préfixe pour GitHub Pages */}
    <BrowserRouter basename="/challenge-15">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Confirmation from './pages/Confirmation'
import SignatureForm from './pages/SignatureForm'
import Thanks from './pages/Thanks'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-main flex items-center justify-center p-4">
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/signature" element={<SignatureForm />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
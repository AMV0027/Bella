import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // Check for a session key in localStorage
  const sessionKey = localStorage.getItem('sessionKey')
  if (!sessionKey) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute

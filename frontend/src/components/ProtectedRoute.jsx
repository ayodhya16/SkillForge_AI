import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * allowedRoles: array of strings e.g. ['ADMIN']
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('sf_token')
  const role = localStorage.getItem('sf_role')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // role not allowed — optional: redirect to their dashboard or show 403
    if (role === 'ADMIN') return <Navigate to="/admin" replace />
    if (role === 'INSTRUCTOR') return <Navigate to="/instructor" replace />
    if (role === 'STUDENT') return <Navigate to="/student" replace />
    return <div>Forbidden</div>
  }

  return children
}

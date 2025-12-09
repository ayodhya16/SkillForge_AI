import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'

export default function Nav(){
  const navigate = useNavigate()
  const role = localStorage.getItem('sf_role')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      {role ? (
        <>
          <span style={{ marginRight: 12 }}>Role: {role}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

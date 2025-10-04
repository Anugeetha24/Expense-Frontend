import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../services/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const user = auth.getCurrentUser()

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/profile">Profile</Link>
          {(user.roles || user.authorities || []).includes('ROLE_ADMIN') || (user.roles || []).includes('ADMIN') ? (
            <Link to="/admin">Admin</Link>
          ) : null}
          <button onClick={handleLogout} style={{marginLeft:8}}>Logout</button>
        </>
      )}
    </div>
  )
}

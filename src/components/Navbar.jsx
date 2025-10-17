import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Finance Management</Link>
      </div>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <Link to="/profile">Profile</Link>
            {currentUser.role === 'ROLE_ADMIN' && (
              <Link to="/admin">Admin Panel</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
export default function Navbar() {
  const {username, setUsername} = useAuth();
  return (
    <nav className="nav-container">
        <ul className="subnav">
          {!username && (
            <>
              <li className="navItem">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="navItem">
                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </li>
            </>
          )}
          {username && (
            <>
              <li className="navItem">
                <NavLink className="nav-link" to="/chatroom">Chatroom</NavLink>
              </li>
              <li className="navItem">
                
                <span className="nav-link">Hello, {username}!</span>
              </li>
              <li className="navItem">
                <NavLink
                  className="nav-link"
                  onClick={() => {
                    setUsername('');
                    localStorage.removeItem('token');
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
    </nav>
  );
  
}
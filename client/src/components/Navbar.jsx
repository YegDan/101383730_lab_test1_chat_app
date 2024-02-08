import React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" >Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup" >Signup</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/chatroom" >Chatroom</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

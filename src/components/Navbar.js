import React from 'react';
import {NavLink} from "react-router-dom";

export const Navbar = (props) => {
 return (
  <div>
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
          <NavLink className="navbar-brand" to={'/'}>Sticker generator</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item active">
                      <NavLink exact className="nav-link" to={'/'}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to={'/features'}>Features</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to={'/about'}>About</NavLink>
                  </li>
              </ul>
          </div>
      </nav>
  </div>
 );
};


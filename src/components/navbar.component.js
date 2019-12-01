import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

// simple navbar functionality with boostrap styles
// Link to will change the http link adding /word or / for root 
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Exercise App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">New User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
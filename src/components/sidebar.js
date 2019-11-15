import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = props => (
  <div id="sidebar" className="pos-f-t">
    <nav className="navbar navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
    <div className="collapse bg-dark p-4" id="navbarToggleExternalContent">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/home" className="nav-link active">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/calculator" className="nav-link">
            Retirement Calculator
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Sidebar);

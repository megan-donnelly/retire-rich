import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = props => (
  <div id="home">
    <h1 className="view-title">Retire Rich</h1>
    <img id="dollar-icon" src={require('./dollar-icon.png')} />
    <Link to="/calculator">
      <button>Get Started</button>
    </Link>
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

export default connect(mapState, mapDispatch)(Home);

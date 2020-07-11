import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ logout, isAuthenticated }) => {
  const authNavbar = (
    <nav className='navbar navbar-expand-lg navbar-light navbar-color'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#SCP-navbar'
          aria-controls='SCP-navbar'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='SCP-navbar'>
          <Link className='navbar-brand mr-auto' to='/'>
            <div style={{ width: '100px' }}>
              <img
                src='/images/scp-logo.png'
                className='img-fluid'
                alt='SCP Logo'
              />
            </div>
          </Link>
          <div className='navbar-nav'>
            <Link className='nav-item nav-link' to='/'>
              <i className='fas fa-tachometer-alt'></i>&nbsp;Dashboard
            </Link>
            <Link className='nav-item nav-link' to='/profile'>
              <i className='fas fa-user'></i>&nbsp;Profile
            </Link>
            <a onClick={logout} className='nav-item nav-link' href=''>
              <i className='fas fa-sign-out-alt'></i>&nbsp;Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  return <Fragment>{isAuthenticated && authNavbar}</Fragment>;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

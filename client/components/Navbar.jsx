import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
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
            Logo
          </Link>
          <div className='navbar-nav'>
            <Link className='nav-item nav-link' to='/'>
              Dashboard
            </Link>
            <Link className='nav-item nav-link' to='#'>
              Profile
            </Link>
            <Link className='nav-item nav-link' to='#'>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

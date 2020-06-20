import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    // setFormData is like this.setState to set state fields equal to the inputs
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  // Redirect to /dashboard if user is logged in

  return (
    <Fragment>
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h4 className='mb-4'>Super Coupon Pocket</h4>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => handleChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => handleChange(e)}
                minLength='6'
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
              Login
            </button>
          </form>
          <div className='my-4 font-weight-bold'>OR</div>
          <button className='btn btn-primary btn-block'>Register</button>
        </div>
      </div>
    </Fragment>
  );
};

// Login.propTypes = {};

export default Login;

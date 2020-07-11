import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    consentTC: false
  });

  const { username, email, password, repeatPassword, consentTC } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Get the state of disable sign up button, by default it's true
  const [disableSignUpBtn, toggleDisabled] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    // Check if two passwords matches. If not, fire alert.
    if (password !== repeatPassword) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  // Redirect to /dashboard when user is registered successfully
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h4 className='mb-4'>Sign Up</h4>

          <form onSubmit={e => handleSubmit(e)}>
            <div className='form-group form-group--insertIcon insertIcon-left'>
              <input
                type='text'
                className='form-control input-field font-italic'
                placeholder='Name'
                name='username'
                value={username}
                onChange={e => handleChange(e)}
                required
              />
              <i className='fas fa-user'></i>
            </div>
            <div className='form-group form-group--insertIcon insertIcon-left'>
              <input
                type='email'
                className='form-control input-field font-italic'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => handleChange(e)}
                required
              />
              <i className='far fa-envelope'></i>
            </div>
            <div className='form-group form-group--insertIcon insertIcon-left'>
              <input
                type='password'
                className='form-control input-field font-italic'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => handleChange(e)}
                minLength='6'
              />
              <i className='fas fa-lock'></i>
            </div>
            <div className='form-group form-group--insertIcon insertIcon-left'>
              <input
                type='password'
                className='form-control input-field font-italic'
                placeholder='Confirm Password'
                name='repeatPassword'
                value={repeatPassword}
                onChange={e => handleChange(e)}
                minLength='6'
              />
              <i className='fas fa-lock'></i>
            </div>
            <div className='form-group float-left'>
              <input
                type='checkbox'
                name='consentTC'
                checked={consentTC}
                value={consentTC}
                id='consentCheck'
                onChange={e => {
                  setFormData({ ...formData, consentTC: !consentTC });
                  toggleDisabled(!disableSignUpBtn);
                }}
              />
              <label htmlFor='consentCheck' className='ml-2'>
                I agree to the <Link to='#!'>Terms & Condition</Link>
              </label>
            </div>
            <button
              type='submit'
              className='btn btn-themeBlue btn-block'
              disabled={disableSignUpBtn ? 'disabled' : ''}
            >
              Sign up
            </button>
          </form>

          <div className='my-4 font-weight-bold'>OR</div>
          <Link to='/' className='btn btn-themeBlue btn-block'>
            Login
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);

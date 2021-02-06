import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [inputType, setInputType] = useState('password');
  const [visiblity, setVisibility] = useState(false);

  const { email, password } = loginData;

  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (visiblity) {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }, [visiblity]);

  //Redirecting is user logged in
  if (isAuthenticated) {
    console.log('Hello');
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={(e) => onLogin(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group inputContainer'>
          <i
            onClick={() => {
              if (password.length > 0) setVisibility(!visiblity);
            }}
            className='far fa-eye icon'
          ></i>
          <input
            type={inputType}
            placeholder='Password'
            required
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
            className='Field'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p className='my-1'>
        Forgot Password? <Link to='/reset-password'>Reset Password</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

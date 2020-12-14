import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const { email, password } = loginData;

  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onLogin = (e) => {
    e.preventDefault();
    alert(`Email id is ${email} & password is ${password}`);
  };

  return (
    <Fragment>
      <h1 class='large text-primary'>Sign In</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Sign into Your Account
      </p>
      <form class='form' onSubmit={(e) => onLogin(e)}>
        <div class='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
          />
        </div>
        <input type='submit' class='btn btn-primary' value='Login' />
      </form>
      <p class='my-1'>
        Don't have an account? <Link to='/'>Sign Up</Link>
      </p>
    </Fragment>
  );
};
export default Login;

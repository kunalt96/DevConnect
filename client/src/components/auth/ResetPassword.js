import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { resetPassword } from '../../actions/auth';

const ResetPassword = ({
  setAlert,
  isAuthenticated,
  resetPassword,
  history,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log('In here');
    e.preventDefault();
    if (password !== password2) {
      console.log('In side if');
      setAlert('Password dont match', 'danger');
    } else {
      resetPassword(email, password, history);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <>
      <h1 className='large text-primary'>Reset Password</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            required
            onChange={(e) => onChange(e)}
            value={email}
            placeholder='Enter Your Valid Email'
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            onChange={(e) => onChange(e)}
            value={password2}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Reset Passowrd'
        />
      </form>
      <p className='my-1'>
        Changed Your Mind? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};

ResetPassword.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { resetPassword, setAlert })(
  withRouter(ResetPassword)
);

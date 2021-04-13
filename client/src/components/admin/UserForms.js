import React, { useState } from 'react';
import './UserForms.css';
import { connect } from 'react-redux';
import { adminRegister } from '../../actions/admin';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

const UsersForms = ({ adminRegister, setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password dont match', 'danger');
      setFormData({ ...formData, password: '', password2: '' });
    } else {
      adminRegister({ name, email, password });
      setFormData({ name: '', email: '', password: '', password2: '' });
    }
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <br />
        <div className='input-container'>
          <i style={{ color: '#17a2b8' }} className='fa fa-user fa-2x'></i>
          <input
            className='input-field'
            value={name}
            type='text'
            placeholder='Name of User'
            name='name'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-container'>
          <i
            style={{ color: '#17a2b8' }}
            className='fa fa-envelope-open fa-2x'
          ></i>
          <input
            className='input-field'
            type='email'
            value={email}
            placeholder='Email Id'
            name='email'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-container'>
          <i style={{ color: '#17a2b8' }} className='fa fa-key fa-2x'></i>
          <input
            className='input-field'
            type='password'
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-container'>
          <i style={{ color: '#17a2b8' }} className='fas fa-check fa-2x'></i>
          <input
            className='input-field'
            type='password'
            placeholder='Confirm The Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <button type='submit' className='btn'>
          Register
        </button>
      </form>
    </>
  );
};

UsersForms.propTypes = {
  adminRegister: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { adminRegister, setAlert })(UsersForms);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
// import e from 'express';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <>
      <h1 class='large text-primary'>Add An Education</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any school or bootcamps that you
        have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} class='form'>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Your School'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Your Degree'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            name='fieldofstudy'
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            value={from}
            onChange={(e) => onChange(e)}
            name='from'
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              value={current}
              checked={current}
              value={degree}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              name='current'
            />{' '}
            Current Degree/Programme
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            value={to}
            onChange={(e) => onChange(e)}
            name='to'
            disabled={toDateDisabled ? 'disabled' : ''}
          />{' '}
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Programme Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));

import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, to, current, description, from, location, title, _id },
}) => {
  console.log(_id);
  return (
    <>
      {' '}
      <div key={_id}>
        <h3 className='text-dark'>{company}</h3>
        <p>
          <Moment format='YYYY-MM'>{from}</Moment> -{' '}
          {to === null ? (
            <span>Current</span>
          ) : (
            <span>
              <Moment format='YYYY-MM'>{to}</Moment>
            </span>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {title}
        </p>
        <p>
          <strong>Location: </strong>
          {location}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;

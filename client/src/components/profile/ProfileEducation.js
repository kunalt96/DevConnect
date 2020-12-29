import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEduction = ({
  education: { degree, to, description, from, fieldofstudy, school, _id },
}) => {
  console.log(_id);
  return (
    <>
      {' '}
      <div key={_id}>
        <h3 className='text-dark'>{school}</h3>
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
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </>
  );
};

ProfileEduction.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEduction;

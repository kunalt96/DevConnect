import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../../img/avatar.jpg';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills,
    profilePic,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img
        alt='user-avatar'
        src={profilePic ? profilePic.profilePicUrl : Avatar}
        className='round-img'
      />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>{`at ${company}`}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => {
          return (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'></i>
              {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

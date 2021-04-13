import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  const [searchDeveloper, setSearchDeveloper] = useState('');
  const [searchProfile, setSearchProfile] = useState([]);
  console.log(profiles);

  const removeDevelopers = (e) => {
    e.preventDefault();
    let valueProfiles = [];
    let str1 = searchDeveloper.trim().replace(/\s/g, '').toLowerCase();
    profiles.forEach((value, i) => {
      let searchValue = value.user.name.trim().replace(/\s/g, '').toLowerCase();
      console.log(searchValue);
      if (searchValue.indexOf(str1) != -1) {
        valueProfiles.push(value);
      }
    });
    setSearchProfile(valueProfiles);
    setSearchDeveloper('');
  };

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading && profiles ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with developers
          </p>
          <form onSubmit={removeDevelopers} className='form'>
            <div className='form-group'>
              <input
                placeholder='Search Developers here'
                type='search'
                name='searchDeveloper'
                value={searchDeveloper}
                onChange={(e) => setSearchDeveloper(e.target.value)}
              />
            </div>
          </form>
          <div className='profiles'>
            {searchProfile.length > 0 ? (
              <>
                {' '}
                {searchProfile.map((profile) => {
                  console.log(profiles);
                  return <ProfileItem key={profile._id} profile={profile} />;
                })}{' '}
              </>
            ) : profiles.length > 0 ? (
              <>
                {' '}
                {profiles.map((profile) => {
                  console.log(profiles);
                  return <ProfileItem key={profile._id} profile={profile} />;
                })}{' '}
              </>
            ) : (
              <h4>No Profiles found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

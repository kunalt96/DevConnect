import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CreateResume from './CreateResume';

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Link className='btn btn-light' to='/profiles'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className='btn btn-dark' to='/edit-profile'>
                Edit Profile
              </Link>
            )}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id &&
            profile.education.length > 0 &&
            profile.experience.length > 0 &&
            profile.skills && (
              <PDFDownloadLink
                document={<CreateResume data={profile}></CreateResume>}
                fileName={profile.user.name + '.pdf'}
                className='btn btn-dark'
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download Profile'
                }
              </PDFDownloadLink>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((experience) => {
                  return <ProfileExperience experience={experience} />;
                })
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((education) => {
                  return <ProfileEducation education={education} />;
                })
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

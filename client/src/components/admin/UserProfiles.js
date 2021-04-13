import React, { useEffect } from 'react';
import './UserProfiles.css';
import AvatarImage from '../../img/avatarImage.PNG';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/admin';
import AdminLoader from '../../img/adminLoader.gif';

const UserProfiles = ({ adminObj: { userProfiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  if (loading)
    return (
      <>
        <div className='styleSpinner'>
          <img src={AdminLoader} style={{ width: '100px', height: '100px' }} />
        </div>
      </>
    );
  return (
    <>
      <h1 style={{ color: '#17a2b8' }}>User Profiles</h1>
      <div className='container-profile-disp-card'>
        {userProfiles &&
          userProfiles.length > 0 &&
          userProfiles.map((profile) => {
            return (
              <div key={profile._id} className='profile-disp-card'>
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic.profilePicUrl}
                    alt='John'
                    style={{ width: '100%', height: '300px' }}
                  />
                ) : (
                  <img
                    src={AvatarImage}
                    style={{ width: '100%', height: '300px' }}
                  ></img>
                )}
                <h1>{profile.user.name}</h1>
                <p className='title'>
                  {profile.status} {profile.company && `at ${profile.company}`}
                </p>
                {profile.bio ? <p>{profile.bio}</p> : <p>No bio updated</p>}

                <div style={{ margin: '24px 0' }}>
                  {profile.social ? (
                    <>
                      {profile.social.instagram.length > 0 && (
                        <a
                          className='profile-link'
                          href={profile.social.instagram}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i
                            style={{ color: 'black' }}
                            className='fab fa-instagram fa-2x'
                          ></i>
                        </a>
                      )}
                      {profile.social.twitter.length > 0 && (
                        <a
                          className='profile-link'
                          href={profile.social.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i
                            style={{ color: 'black' }}
                            className='fab fa-twitter fa-2x'
                          ></i>
                        </a>
                      )}
                      {profile.social.linkedlin.length > 0 && (
                        <a
                          className='profile-link'
                          href={profile.social.linkedlin}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i
                            style={{ color: 'black' }}
                            className='fab fa-linkedin fa-2x'
                          ></i>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <p>No social credentials</p>
                      <br />
                    </>
                  )}
                </div>
                <p style={{ marginBottom: '0px' }}>
                  <a
                    href={`mailto:${profile.user.email}`}
                    className='profile-button'
                  >
                    Contact
                  </a>
                </p>
              </div>
            );
          })}
      </div>
      <br />
    </>
  );
};

UserProfiles.propTypes = {
  adminObj: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  adminObj: state.adminOverview,
});

export default connect(mapStateToProps, { getProfiles })(UserProfiles);

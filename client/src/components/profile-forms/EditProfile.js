import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import axios from 'axios';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  setAlert,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    skills: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedlin: '',
    profilePicUrl: '',
    public_id: '',
  });

  const [imageData, setImage] = useState(null);
  const [loadSpinner, setSpinner] = useState(false);

  const [displaySocialInputs, toggleSocialInput] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      status: loading || !profile.status ? '' : profile.status,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      skills: loading || !profile.skills ? '' : profile.skills.join(),
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedlin: loading || !profile.social ? '' : profile.social.linkedlin,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      profilePicUrl:
        loading || !profile.profilePic ? '' : profile.profilePic.profilePicUrl,
      public_id:
        loading || !profile.profilePic ? '' : profile.profilePic.public_id,
    });
  }, [getCurrentProfile]);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedlin,
    profilePicUrl,
    public_id,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData, 2);
    createProfile(formData, history, true);
  };

  const fileUpload = async () => {
    const imageDataForm = new FormData();
    imageDataForm.append('profilePic', imageData);
    try {
      const res = await axios.post('/api/profile/upload', imageDataForm);
      console.log(res.data);
      setFormData({
        ...formData,
        profilePicUrl: res.data.secure_url,
        public_id: res.data.public_id,
      });
      setAlert('Yo! You got a profile pic', 'success');
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setAlert('Image not uploaded', 'danger');
      setSpinner(false);
    }
  };

  const removeProfilePic = async () => {
    console.log(public_id);
    try {
      axios.delete(`/api/profile/removePic/${public_id}`);
      setFormData({
        ...formData,
        profilePicUrl: null,
        public_id: null,
      });
      setAlert('Profile Pic removed', 'success');
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setAlert('Image not uploaded', 'danger');
      setSpinner(false);
    }
  };

  return (
    <>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <br />
      {loadSpinner ? (
        <div class='lds-ripple'>
          <div></div>
          <div></div>
        </div>
      ) : (
        <></>
      )}
      {/* <div className='loader'></div> */}

      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            className='form-control'
            name='profilePic'
            type='file'
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button
            onClick={() => {
              setSpinner(true);
              fileUpload();
            }}
            type='button'
            className='btn btn-primary'
          >
            Upload Image
          </button>
          {profilePicUrl && (
            <button
              onClick={() => {
                setSpinner(true);
                removeProfilePic();
              }}
              className='btn btn-danger'
            >
              Remove Profile Pic
            </button>
          )}
        </div>
        {profilePicUrl ? (
          <p className='lead'>
            You can Upload or Remove Pic. Click on Submit to view changes
          </p>
        ) : (
          <p>It seems there is no profile, Do update one</p>
        )}

        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Company'
            name='company'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            value={website}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Website'
            name='website'
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Location'
            name='location'
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            value={skills}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* Skills'
            name='skills'
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder='A short bio of yourself'
            name='bio'
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => {
              toggleSocialInput(!displaySocialInputs);
            }}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                value={twitter}
                onChange={(e) => onChange(e)}
                placeholder='Twitter URL'
                name='twitter'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                value={facebook}
                onChange={(e) => onChange(e)}
                placeholder='Facebook URL'
                name='facebook'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                value={youtube}
                onChange={(e) => onChange(e)}
                placeholder='YouTube URL'
                name='youtube'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                value={linkedlin}
                onChange={(e) => onChange(e)}
                placeholder='Linkedin URL'
                name='linkedlin'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                value={instagram}
                onChange={(e) => onChange(e)}
                placeholder='Instagram URL'
                name='instagram'
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  setAlert,
})(withRouter(EditProfile));

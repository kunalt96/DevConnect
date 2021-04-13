import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { callAllUsers } from '../../actions/admin';
import PropTypes from 'prop-types';
import Profiles from '../profiles/Profiles';

function LoadUsers({ adminObj: { loading, users }, callAllUsers }) {
  console.log('In here');
  useEffect(() => {
    callAllUsers();
    console.log(loading, users);
  }, [callAllUsers]);

  return <div>HELLO WORLD</div>;
}

Profiles.propTypes = {
  callAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminObj: state.admin,
});

export default connect(mapStateToProps, { callAllUsers })(LoadUsers);

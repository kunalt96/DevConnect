import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Overview from './Overview';
import Analytics from './Analytics';
import UsersData from './UsersData';
import UserProfiles from './UserProfiles';

import PrivateRoute from '../routing/PrivateRoute';

const AdminComponent = ({ auth: { user } }) => {
  if (!user?.isAdmin && user?.isAdmin !== undefined) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      <Router>
        <Fragment>
          <Sidebar />
          <Switch>
            <Route exact path='/adminComponent' component={Overview} />
            <PrivateRoute
              exact
              path='/adminComponent/Overview'
              component={Overview}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/adminComponent/Analytics'
              component={Analytics}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/adminComponent/UsersData'
              component={UsersData}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/adminComponent/UserProfiles'
              component={UserProfiles}
            ></PrivateRoute>
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

AdminComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminComponent);

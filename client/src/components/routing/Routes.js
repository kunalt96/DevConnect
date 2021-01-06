import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import Profile from '../profile/Profile';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

// Loading all routes to clean up appjs and provide path
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute
          exact
          path='/add-experience'
          component={AddExperience}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path='/add-education'
          component={AddEducation}
        ></PrivateRoute>
        <PrivateRoute exact path='/posts' component={Posts}></PrivateRoute>
        <PrivateRoute exact path='/post/:id' component={Post}></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};

export default Routes;

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import admin from './admin';
import adminOverview from './adminOverview';
import notifications from './notifications';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  admin,
  adminOverview,
  notifications,
});

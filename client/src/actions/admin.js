import {
  GET_ALL_USERS,
  GET_OVERVIEW_DATA,
  GET_ANALYTICS_DATA,
  GET_USERS_DATA,
  GET_PROFILES_INFO,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const callAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/admin/usersData');
    dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert(errors, 'danger'));
  }
};

export const getOverViewData = () => async (dispatch) => {
  try {
    const totalUsers = await axios.get('/api/admin/usersData?data=totalUsers');
    const usersWithProfiles = await axios.get(
      '/api/admin/usersProfiles?data=totalProfiles'
    );
    const totalPosts = await axios.get(
      '/api/admin/retrievePosts?data=totalPosts'
    );
    const totalImagesUploaded = await axios.get('/api/admin/totalImages');
    const experienceDevelopers = await axios.get(
      '/api/admin/experienceDevelopers'
    );
    let payLoadData = {
      totalUsers,
      usersWithProfiles,
      totalPosts,
      experienceDevelopers,
      totalImagesUploaded,
    };
    console.log(payLoadData);
    dispatch({
      type: GET_OVERVIEW_DATA,
      payload: payLoadData,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert('Server Error', 'danger'));
  }
};

export const getAnalyticsData = () => async (dispatch) => {
  try {
    const dataBarGraph = await axios.get('/api/admin/analytics?data=usersData');
    const dataSkillsPie = await axios.get(
      '/api/admin/analytics?data=skillsPerecentage'
    );
    const developersStatusPie = await axios.get(
      '/api/admin/analytics?data=developersRolePerecentage'
    );
    const postsMadeMonthLine = await axios.get(
      '/api/admin/analytics?data=postsActivity'
    );
    let finalObj = {
      dataSkillsPie: dataSkillsPie.data,
      dataBarGraph: dataBarGraph.data,
      developersStatusPie: developersStatusPie.data,
      postsMadeMonthLine: postsMadeMonthLine.data,
    };
    dispatch({
      type: GET_ANALYTICS_DATA,
      payload: finalObj,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert('Server Error', 'danger'));
  }
};

export const adminRegister = ({ name, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch(setAlert(`User with ${email} registered`, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }
  }
};

export const editUsersData = ({ searchData }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ searchData });
    const resp = await axios.put('/api/admin/retrieveUser', body, config);
    dispatch({
      type: GET_USERS_DATA,
      payload: resp.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Error while getting data', 'danger'));
  }
};

export const updateData = ({ email, name, id }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(email, name, id);
    console.log('IN HERE');
    const body = JSON.stringify({ email, name });
    const resp = await axios.put(`/api/admin/editData/${id}`, body, config);
    if (resp) {
      console.log(resp);
      dispatch(setAlert('User details succesfully Updated', 'success'));
      let origin = window.location.origin;
      setTimeout(() => {
        window.location.assign(`${origin}/adminComponent`);
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Error In editing data', 'danger'));
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const resp = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES_INFO,
      payload: resp.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Error in fetching profiles', 'danger'));
  }
};

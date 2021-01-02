import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
} from './types';

// Get the post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const removeLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const deletePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${postid}`);
    dispatch({
      type: DELETE_POST,
      payload: { id: postid },
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/post/', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

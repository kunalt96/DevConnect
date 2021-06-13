import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid/v4';

let iid;

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  console.log('in here', id);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 4000);
};

export const setNotifications = (msg) => {
  iid = uuid();
  return {
    type: SET_ALERT,
    payload: { msg, alertType: 'success', id: iid },
  };
};

export const removeNotifications = () => {
  let id = iid;
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};

import { setAlert } from './alert';
import { GET_NOTIFICATIONS } from './types';

export const showNotifications = (data) => {
  return { type: GET_NOTIFICATIONS, payload: data };
};

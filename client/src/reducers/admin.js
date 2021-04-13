import { GET_ALL_USERS } from '../actions/types';

const initialState = {
  loading: true,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, loading: false, users: payload };
    default:
      return state;
  }
}

import { GET_NOTIFICATIONS } from '../actions/types';

const initialState = {
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return { ...state, messages: [payload, ...state.messages] };
    default:
      return state;
  }
}

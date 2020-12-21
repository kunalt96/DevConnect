import axios from 'axios';

// setting global headers for token if token is present otherwise delete if anything is there
// doing global headers because it can be sent in every request leaving the app
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

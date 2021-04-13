import {
  GET_OVERVIEW_DATA,
  GET_ANALYTICS_DATA,
  GET_USERS_DATA,
  GET_PROFILES_INFO,
} from '../actions/types';

const initialState = {
  loading: true,
  experienceDevelopers: 0,
  totalImagesUploaded: 0,
  totalPosts: 0,
  totalUsers: 0,
  usersWithProfiles: 0,
  barGraphDataUsers: {},
  pieChartTotalSkills: {},
  developersStatusPie: {},
  retrievedUsers: [],
  userProfiles: [],
};

export default function (state = initialState, action) {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case GET_OVERVIEW_DATA:
      console.log(payload);
      return {
        ...state,
        loading: false,
        experienceDevelopers: payload.experienceDevelopers.data,
        totalImagesUploaded: payload.totalImagesUploaded.data,
        totalPosts: payload.totalPosts.data,
        totalUsers: payload.totalUsers.data,
        usersWithProfiles: payload.usersWithProfiles.data,
      };
    case GET_ANALYTICS_DATA:
      console.log('IN HERE');
      return {
        ...state,
        loading: false,
        barGraphDataUsers: payload.dataBarGraph,
        pieChartTotalSkills: payload.dataSkillsPie,
        developersStatusPie: payload.developersStatusPie,
        postsMadeMonthLine: payload.postsMadeMonthLine,
      };
    case GET_USERS_DATA:
      return {
        ...state,
        loading: false,
        retrievedUsers: payload,
      };
    case GET_PROFILES_INFO:
      return {
        ...state,
        loading: false,
        userProfiles: payload,
      };
    default:
      return state;
  }
}

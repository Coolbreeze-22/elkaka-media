import {
  AUTH,
  LOGOUT,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  DELETE_USER,
  ADMIN,
  LEVEL,
  USER_ERROR,
  AUTH_ERROR,
  USER_LOADING,
} from "../actions/actionTypes.js";

const userProfile = process.env.REACT_APP_USER_PROFILE;

const authRedux = (
  state = { authData: {}, users: [], user: {}, error: {authError:"", userError:"" }, isLoading: false },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(userProfile, JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload };

    case LOGOUT:
      localStorage.removeItem(userProfile);
      return { ...state, authData: {} };

    case FETCH_USERS:
      return { ...state, users: action.payload };

    case FETCH_USER_BY_ID:
      return { ...state, user: action.payload };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u._id !== action.payload),
      };

    case ADMIN:
      return { ...state, user: action.payload };

    case LEVEL:
      return { ...state, user: action.payload };

    case AUTH_ERROR:
      return { ...state, error: { ...state.error, authError: action.payload} };
    case USER_ERROR:
      return { ...state, error: { ...state.error, userError: action.payload} };

    case USER_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default authRedux;

import * as api from "../api/index.js";
import {
  AUTH,
  FETCH_USERS,
  DELETE_USER,
  FETCH_USER_BY_ID,
  ADMIN,
  LEVEL,
  USER_ERROR,
  AUTH_ERROR,
  USER_LOADING
} from "./actionTypes.js";

export const signUp = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, payload: data });
      navigate("/");
    } catch (error) {
      const {response:{data:{message}}} = error;
      dispatch({ type: AUTH_ERROR, payload: message });
      // return message;
    }
  };
};

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    const {response:{data:{message}}} = error;
    dispatch({ type: AUTH_ERROR, payload: message });
    // return message;
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING, payload: true });
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_USERS, payload: data });
    dispatch({ type: USER_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: USER_LOADING, payload: false });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING, payload: true });
    const { data } = await api.getUserById(id);
    dispatch({ type: FETCH_USER_BY_ID, payload: data });
    dispatch({ type: USER_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: USER_LOADING, payload: false });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    const {response:{data:{message}}} = error;
    dispatch({ type: USER_ERROR, payload: message });
    return message;
  }
};

export const makeAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.makeAdmin(id);
    dispatch({ type: ADMIN, payload: data });
  } catch (error) {
    const {response:{data:{message}}} = error;
    dispatch({ type: USER_ERROR, payload: message });
    return message;
  }
};
export const adminLevels = (id, item) => async (dispatch) => {
  try {
    const { data } = await api.adminLevels(id, item);
    dispatch({ type: LEVEL, payload: data });
  } catch (error) {
    const {response:{data:{message}}} = error;
    dispatch({ type: USER_ERROR, payload: message });
    return message;
  }
};
export const removeAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeAdmin(id);
    dispatch({ type: ADMIN, payload: data });
  } catch (error) {
    const {response:{data:{message}}} = error;
    dispatch({ type: USER_ERROR, payload: message });
    return message;
  }
};

export const updateUserModel = () => async (dispatch) => {
  try {
    const { data } = await api.updateUserModel();
  } catch (error) {}
};

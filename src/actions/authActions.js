import * as api from "../api/index.js";
import {
  AUTH,
  LOGOUT,
  FETCH_USERS,
  DELETE_USER,
  FETCH_USER_BY_ID,
  START_LOADING,
  END_LOADING,
} from "./actionTypes.js";

export const signUp = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, payload: data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_USERS, payload: data });
    dispatch({ type: END_LOADING });
    // console.log(data)
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserById(id);
    dispatch({ type: FETCH_USER_BY_ID, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const {data} =await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
    // console.log(data)
  } catch (error) {
    console.log(error);
  }
};

export const makeAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.makeAdmin(id);
    dispatch({ type: "ADMIN", payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const levels = (id, item) => async (dispatch) => {
  try {
    const { data } = await api.levels(id, item);
    dispatch({ type: "LEVEL", payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const removeAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeAdmin(id);
    dispatch({ type: "ADMIN", payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserModel = () => async (dispatch) => {
  try {
    const { data } = await api.updateUserModel();
    // console.log(data)
  } catch (error) {
    console.log(error);
  }
};

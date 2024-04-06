import { combineReducers } from "redux";
import postsRedux from "./postsRedux";
import authRedux from "./authRedux";

export default combineReducers({ posts: postsRedux, auth: authRedux });
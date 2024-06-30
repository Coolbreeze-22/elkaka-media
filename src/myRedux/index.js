import { combineReducers } from "redux";
import postsRedux from "./postsRedux";
import authRedux from "./authRedux";
import othersRedux from "./othersRedux";

export default combineReducers({ posts: postsRedux, auth: authRedux, others: othersRedux });
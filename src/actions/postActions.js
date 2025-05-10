import * as api from "../api/index.js";
import {
  FETCH_POSTS,
  CREATE,
  LIKE,
  UPDATE,
  DELETE,
  COMMENT,
  DELETE_COMMENT,
  FETCH_POST_BY_SEARCH,
  FETCH_RELATED_POSTS,
  FETCH_POST_BY_ID,
  FETCH_OTHERS,
  POST_LOADING,
} from "./actionTypes.js";

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING, payload: true });
    const { data } = await api.getPosts(page);
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch({ type: FETCH_OTHERS, payload: data });
    dispatch({ type: POST_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: POST_LOADING, payload: false });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING, payload: true });
    const { data } = await api.getPostById(id);
    dispatch({ type: FETCH_POST_BY_ID, payload: data });

    if (data?.tags) {
      dispatch(getRelatedPosts({ tags: data.tags.join(",") }));
    }

    dispatch({ type: POST_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: POST_LOADING, payload: false });
  }
};

export function getRelatedPosts(searchQuery) {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_LOADING, payload: true });
      const { data } = await api.getRelatedPosts(searchQuery);
      dispatch({ type: FETCH_RELATED_POSTS, payload: data });
      dispatch({ type: FETCH_OTHERS, payload: data });
      dispatch({ type: POST_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: POST_LOADING, payload: false });
    }
  };
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING, payload: true });
    const { data } = await api.getPostsBySearch(searchQuery);
    dispatch({ type: FETCH_POST_BY_SEARCH, payload: data });
    dispatch({ type: FETCH_OTHERS, payload: data });
    dispatch({ type: POST_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: POST_LOADING, payload: false });
  }
};

export const createPost = (post, page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_LOADING, payload: true });
      const { data } = await api.createPost(post, page);
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: FETCH_OTHERS, payload: data });
      dispatch({ type: POST_LOADING, payload: false });
    } catch (error) {}
  };
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {}
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {}
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {}
};
export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(comment, id);
    dispatch({ type: COMMENT, payload: data });
  } catch (error) {}
};
export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(commentId, postId);
    dispatch({ type: DELETE_COMMENT, payload: data });
  } catch (error) {}
};

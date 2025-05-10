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
  RESET_POSTS,
  RESET_POST,
  POST_LOADING,
} from "../actions/actionTypes";

const postsRedux = (
  state = { posts: [], post: {}, recommendPosts: [], isLoading: false },
  action
) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload.posts };
    case FETCH_POST_BY_ID:
      return { ...state, post: action.payload };
    case FETCH_POST_BY_SEARCH:
      return { ...state, posts: action.payload.posts };
    case FETCH_RELATED_POSTS:
      return { ...state, recommendPosts: action.payload.posts };
    case CREATE:
      return { ...state, posts: action.payload.finalPosts };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case COMMENT:
      return { ...state, post: action.payload };
    case DELETE_COMMENT:
      return { ...state, post: action.payload };
    case RESET_POST:
      return { ...state, post: action.payload };
    case RESET_POSTS:
      return { ...state, recommendPosts: action.payload };
    case POST_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default postsRedux;

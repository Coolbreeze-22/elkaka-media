// import { FETCH_POSTS, FETCH_QUERY, FETCH_ID, FETCH_OTHERS } from '../actions/actionTypes';

const postsRedux = (state ={ posts: [], post:{}}, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case 'FETCH_POSTS':
            return {...state, posts: action.payload.posts};
        case 'FETCH_ID':
            return {...state, post: action.payload};
        case 'FETCH_QUERY':
            return {...state, posts: action.payload.posts};
        case 'CREATE':
            return {...state, posts: action.payload.finalPosts};
        case 'DELETE':
            return {...state, posts: state.posts.filter((p) => p._id !== action.payload)};
        case 'UPDATE':
        case 'LIKE':
            return {...state, posts: state.posts.map((item) => item._id === action.payload._id ? action.payload : item)};
        case 'COMMENT':
            return {...state, posts: state.posts.map((item) => item._id === action.payload._id ? action.payload : item)};
        case 'DELETE_COMMENT':
            return {...state, post:{...state.post, comments: state.post.comments.filter((item) => item._id !== action.payload)}};
            
        default:
            return state;
    }
}

export default postsRedux;



// switch (key) {
//   case value:
    
//     break;

//   default:
//     break;
// }
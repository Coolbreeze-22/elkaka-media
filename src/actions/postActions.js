import * as api from '../api/index.js';
import { FETCH_POSTS, FETCH_QUERY, FETCH_ID, FETCH_OTHERS, END_LOADING, START_LOADING } from './actionTypes.js';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPosts(page);
        dispatch({ type: FETCH_POSTS, payload: data });
        dispatch({ type: FETCH_OTHERS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPostById(id);
        dispatch({ type: FETCH_ID, payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPostsBySearch(searchQuery);
        dispatch({ type: FETCH_QUERY, payload: data });
        dispatch({ type: FETCH_OTHERS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: END_LOADING });
        console.log(error);
    }
};

export const createPost = (post, page) => {
    return async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post, page);
        dispatch({ type: 'CREATE', payload: data });
        dispatch({ type: FETCH_OTHERS, payload: data });
        dispatch({ type: END_LOADING });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id); 
        dispatch({ type: 'LIKE',  payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}
export const commentPost = (value, id) => async (dispatch) =>
{
    try {
        const { data } = await api.commentPost(value, id); 
        dispatch({ type: 'COMMENT',  payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}
export const deleteComment = (cId, post) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(cId, post);
        // dispatch({ type: 'DELETE_COMMENT', payload: cId });
        // return data.comments
    } catch (error) {
        console.log(error);
    }
}



// export const createPost = (post) => async (dispatch) => {
//     try {
//         const { data } = await axios.post(url, post);
//         dispatch({ type: 'CREATE', payload: data });
        
//     } catch (error) {
//         console.log(error);
//     }
// }
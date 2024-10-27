import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const userProfile = process.env.REACT_APP_USER_PROFILE;

API.interceptors.request.use((req) => {
    if (localStorage.getItem(userProfile)) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem(userProfile)).token}`
    }
    return req;
});


export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPostById = (id) => API.get(`/posts/id/${id}`);
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?title=${searchQuery.title}&tags=${searchQuery.tags}&page=${searchQuery.page}`);
export const createPost = (newPost, page) => API.post(`/posts/?page=${page}`, newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment, id) => API.patch(`/posts/${id}/commentPost`, { comment });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const deleteComment = (commentId, post) => API.patch(`/posts/comments/${commentId}`, post);


export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getUsers = () => API.get('/users');
export const getUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`)
export const makeAdmin = (id) => API.patch(`/users/makeAdmin/${id}`)
export const adminLevels = (id, item) => API.patch(`/users/levels/${id}`, item)
export const removeAdmin = (id) => API.patch(`/users/removeAdmin/${id}`)


export const updateUserModel = () => API.patch('/migration');
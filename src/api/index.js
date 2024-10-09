import axios from 'axios';

const API = axios.create({ baseURL: process.env.API_URL });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        // console.log(req.headers.authorization);
    }
    return req;
});


export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPostById = (id) => API.get(`/posts/id/${id}`);
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?title=${searchQuery.title}&tags=${searchQuery.tags}&page=${searchQuery.page}`);
export const createPost = (newPost, page) => API.post(`/posts/?page=${page}`, newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) => API.patch(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const deleteComment = (cId, post) => API.patch(`/posts/comments/${cId}`, post)
// export const deleteComment = (post) => API.delete(`/posts/comments/`, post)


export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getUsers = () => API.get('/users');
export const getUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`)
export const makeAdmin = (id) => API.patch(`/users/makeAdmin/${id}`)
export const levels = (id, item) => API.patch(`/users/levels/${id}`, item)
export const removeAdmin = (id) => API.patch(`/users/removeAdmin/${id}`)


export const updateUserModel = () => API.patch('/migration');
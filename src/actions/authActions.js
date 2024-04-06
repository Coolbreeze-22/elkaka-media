import * as api from '../api/index.js';


export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: 'FETCH_USERS', payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, navigate) => { return async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: 'AUTH', payload: data });
        navigate('/');

    } catch (error) {
        console.log(error);
    }
}
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: 'AUTH', payload: data });
        navigate('/');

    } catch (error) {
        console.log(error);
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: 'DELETE_USER', payload: id });
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
const postsRedux = (posts = [], action) => {
    // console.log(action.payload);
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH_QUERY':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'DELETE':
            return posts.filter((p) => p._id !== action.payload);
        case 'UPDATE':
        case 'LIKE':
            return posts.map((item) => item._id === action.payload._id ? action.payload : item);
        default:
            return posts;
    }
}

export default postsRedux;
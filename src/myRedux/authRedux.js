const authRedux = (state = { authData: {}, allUsers:[] }, action) => {
  switch (action.type) {
    case 'AUTH':
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        return { ...state, authData: action.payload };

        case 'LOGOUT':
          localStorage.clear();
          return {...state, authData:{}};

        case 'FETCH_USERS':
          return {...state, allUsers: action.payload};

        case 'DELETE_USER':
            return {...state, allUsers:[state.allUsers.filter((u) => u._id !== action.payload)]}

    default:
        return state;
  }
}

export default authRedux;
// import { AUTH, LOGOUT, FETCH_USERS, DELETE_USER } from './actionTypes.js';

const authRedux = (state = { authData: {}, users:[], user: {} }, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case 'AUTH':
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        return { ...state, authData: action.payload };

        case 'LOGOUT':
          localStorage.clear();
          return {...state, authData:{}};

        case 'FETCH_USERS':
          return {...state, users: action.payload};

        case 'FETCH_USER_BY_ID':
          return {...state, user: action.payload};

        case 'DELETE_USER':
            return {...state, users: state.users.filter((u) => u._id !== action.payload)}

        case 'ADMIN':
            return {...state, user: action.payload}

        case 'LEVEL':
            return {...state, user: action.payload}
            

    default:
        return state;
  }
}

export default authRedux;
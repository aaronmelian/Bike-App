const initState = {
  authError: null,
  userData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: action };
    case "LOGIN_SUCCESS":
      return { ...state, authError: null, userInfo: action.userInfo };
    case "USER_DATA_SUCCESS":
      return { ...state, authError: null, userInfo: action.userInfo };
    case "LOGOUT":
      return { authError: null, userInfo: null };

    default:
      return state;
  }
};

export default authReducer;

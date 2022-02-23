const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: action };
    case "LOGIN_SUCCESS":
      return { ...state, authError: null, userInfo: action.userInfo };

    default:
      return state;
  }
};

export default authReducer;

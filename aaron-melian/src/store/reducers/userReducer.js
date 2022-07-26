const initState = {
  userList: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, userList: action.payload };
    case "REMOVE_USER_LIST":
      return { ...state, userList: [] };

    default:
      return state;
  }
};

export default userReducer;

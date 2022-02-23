const verifEmailReducer = (state = 1, action) => {
  switch (action.type) {
    case "VERIF_EMAIL":
      return state + 1;
    default:
      return state;
  }
};

export default verifEmailReducer;

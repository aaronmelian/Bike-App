const initState = {
  bikeList: [],
};

const bikeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_BIKES":
      return { ...state, bikeList: action.payload };
    default:
      return state;
  }
};

export default bikeReducer;

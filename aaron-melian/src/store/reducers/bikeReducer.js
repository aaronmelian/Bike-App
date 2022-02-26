const initState = {
  bikeList: [],
};

const bikeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_BIKES":
      return { ...state, bikeList: action.payload };
    case "REMOVE_BIKE_LIST":
      return { ...state, bikeList: [] };
    default:
      return state;
  }
};

export default bikeReducer;

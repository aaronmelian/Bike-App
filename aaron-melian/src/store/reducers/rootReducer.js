import authReducer from "./authReducer";
import bikeReducer from "./bikeReducer";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  bikes: bikeReducer,
});

export default rootReducer;

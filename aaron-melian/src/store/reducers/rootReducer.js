import authReducer from "./authReducer";
import bikeReducer from "./bikeReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  bikes: bikeReducer,
  users: userReducer,
});

export default rootReducer;

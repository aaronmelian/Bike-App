import authReducer from "./authReducer";
import verifEmailReducer from "../reducers/verifEmailReducer";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  verifEmailReducer: verifEmailReducer,
});

export default rootReducer;

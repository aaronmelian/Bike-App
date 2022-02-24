// React
import React from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Redux
import { useDispatch } from "react-redux";
import { logOut } from "../../store/actions/authActions";

// Constants
import { constants } from "./log-out.constants";
import { routes } from "../../hoc/customRouter/custom-router.routes";

const LogOut = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logUserOut = () => {
    auth.signOut();
    dispatch(logOut());
    navigate(routes.EMPTY);
  };

  return (
    <button onClick={() => logUserOut()}>
      {constants.LOG_OUT_BUTTON_TEXT}
    </button>
  );
};

export default LogOut;

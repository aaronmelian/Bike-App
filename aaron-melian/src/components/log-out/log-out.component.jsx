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
import { removeUserList } from "../../store/actions/userActions";
import { removeBikeList } from "../../store/actions/bikeActions";

// AntD
import { Button } from "antd";

// Constants
import { constants } from "./log-out.constants";
import { routes } from "../../hoc/customRouter/custom-router.routes";

const LogOut = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logUserOut = () => {
    dispatch(logOut());
    dispatch(removeUserList());
    dispatch(removeBikeList());

    auth.signOut();
    navigate(routes.EMPTY);
  };

  return (
    <Button
      type={constants.LOG_OUT_BUTTON_TEXT_TYPE}
      onClick={() => logUserOut()}
    >
      {constants.LOG_OUT_BUTTON_TEXT}
    </Button>
  );
};

export default LogOut;

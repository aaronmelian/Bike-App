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

const LogOut = () => {
  const auth = firebase.auth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logUserOut = () => {
    auth.signOut();
    dispatch(logOut());
    navigate("/");
  };

  return <button onClick={() => logUserOut()}>Log Out</button>;
};

export default LogOut;

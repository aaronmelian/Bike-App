import React from "react";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function LogOut() {
  const auth = firebase.auth();
  const navigate = useNavigate();

  const logUserOut = () => {
    navigate("/");
    auth.signOut();
  };

  return <button onClick={() => logUserOut()}>Log Out</button>;
}

export default LogOut;

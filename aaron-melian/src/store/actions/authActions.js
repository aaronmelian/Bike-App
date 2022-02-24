// Firebase
import firebase from "../../fbConfig";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";

const auth = firebase.auth();

export const signIn = ({ email, password }) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .get()
          .then((resp) => {
            dispatch({ type: "LOGIN_SUCCESS", userInfo: resp.docs[0].data() });
          });
      })
      .catch((error) => {
        let err = error;
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .get()
          .then((resp) => {
            if (resp.docs[0] && resp.docs[0].data().signMethod === "google") {
              err.code = "auth/google-linked";
              err.message = "Google account exists. Sign in with Google!";
            }
            dispatch({ type: "LOGIN_ERROR", err });
          })
          .catch((e) => {
            dispatch({ type: "LOGIN_ERROR", err });
          });
      });
  };
};

export const getData = ({ email }) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(globalConstants.EMAIL, "==", email)
      .get()
      .then((resp) => {
        if (
          resp.docs[0] &&
          resp.docs[0].data() &&
          resp.docs[0].data().isManager
        ) {
          dispatch({
            type: "USER_DATA_SUCCESS",
            userInfo: resp.docs[0].data(),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

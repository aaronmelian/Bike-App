import firebase from "../../fbConfig";

const auth = firebase.auth();

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", credentials.email)
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
          .where("email", "==", credentials.email)
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

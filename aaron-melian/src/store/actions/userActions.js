// Firebase
import firebase from "../../fbConfig";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";

export const getUsers = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .get()
      .then((resp) => {
        if (resp.docs && resp.docs) {
          dispatch({
            type: "GET_USERS",
            payload: resp.docs.map((doc) => doc.data()),
          });
        }
      });
  };
};

export const removeUserList = () => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_USER_LIST",
    });
  };
};

// Firebase
import firebase from "../../fbConfig";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";

export const getBikes = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.BIKES)
      .get()
      .then((resp) => {
        if (resp.docs && resp.docs) {
          dispatch({
            type: "GET_BIKES",
            payload: resp.docs.map((doc) => doc.data()),
          });
        }
      });
  };
};

export const removeBikeList = () => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_BIKE_LIST",
    });
  };
};

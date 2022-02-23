import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBAC7e8kOH58SasH5slSmnsqgTK9qCfSAQ",
  authDomain: "bike-app-342f0.firebaseapp.com",
  projectId: "bike-app-342f0",
  storageBucket: "bike-app-342f0.appspot.com",
  messagingSenderId: "493811675742",
  appId: "1:493811675742:web:e046f200bac35fbdf3facf",
  measurementId: "G-P7ZSDF9627",
});

firebase.firestore();

export default firebase;

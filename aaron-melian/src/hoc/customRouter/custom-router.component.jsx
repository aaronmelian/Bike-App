// React
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Components
import LogInPage from "../../views/login-page/login-page.component";
import SignUpPage from "../../views/sign-up-page/sign-up-page.component";
import LogOut from "../../components/LogOut/LogOut";

// Constants
import { routes } from "./custom-router.routes";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// Firebase
import firebase from "../../fbConfig";

const UserPage = () => {
  return <h3>UserPage</h3>;
};
const ManagerPage = () => {
  return <h3>ManagerPage</h3>;
};

const RequireAuthUserPage = ({ children, firebaseUserData, isManager }) => {
  if (firebaseUserData.isEmpty) {
    return <Navigate to={routes.LOGIN} replace />;
  } else if (isManager) {
    return <Navigate to={routes.MANAGER} replace />;
  }
  return children;
};

const RequireAuthManagerPage = ({ children, firebaseUserData, isManager }) => {
  if (firebaseUserData.isEmpty) {
    return <Navigate to={routes.LOGIN} replace />;
  } else if (!isManager) {
    return <Navigate to={routes.USER} replace />;
  }
  return children;
};

const CantBeAuth = ({ children }) => {
  const firebaseUserData = useSelector((state) => state.firebase.auth);
  if (!firebaseUserData.isEmpty) {
    return <Navigate to={routes.USER} replace />;
  }
  return children;
};

const CustomRouter = () => {
  const [isManager, setIsManager] = useState(false);
  const firebaseUserData = useSelector((state) => state.firebase.auth);

  const checkAdmin = async () => {
    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(globalConstants.EMAIL, "==", firebaseUserData.email)
      .get()
      .then((resp) => {
        if (
          resp.docs[0] &&
          resp.docs[0].data() &&
          resp.docs[0].data().isManager
        ) {
          setIsManager(true);
        }
      });
  };

  useEffect(() => {
    if (!firebaseUserData.isEmpty) {
      checkAdmin();
    }
  }, [firebaseUserData]);
  console.log(isManager);

  return (
    <section>
      <BrowserRouter>
        <LogOut />
        <Routes>
          <Route
            index
            path={routes.LOGIN}
            exact
            element={
              <CantBeAuth>
                <LogInPage />
              </CantBeAuth>
            }
          />
          <Route
            path={routes.SIGN_UP}
            exact
            element={
              <CantBeAuth>
                <SignUpPage />
              </CantBeAuth>
            }
          />
          <Route
            path={routes.USER}
            element={
              <RequireAuthUserPage
                firebaseUserData={firebaseUserData}
                isManager={isManager}
              >
                <UserPage />
              </RequireAuthUserPage>
            }
          />
          <Route
            path={routes.MANAGER}
            element={
              <RequireAuthManagerPage
                firebaseUserData={firebaseUserData}
                isManager={isManager}
              >
                <ManagerPage />
              </RequireAuthManagerPage>
            }
          />
          <Route
            path={routes.FALL_BACK}
            element={<Navigate to={routes.LOGIN} replace />}
          />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default CustomRouter;

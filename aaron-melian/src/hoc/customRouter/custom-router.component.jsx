// React
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../store/actions/authActions";

// Views
import ManagerPage from "../../views/manager-page/manager-page.component";
import LogInPage from "../../views/login-page/login-page.component";
import SignUpPage from "../../views/sign-up-page/sign-up-page.component";

// Components
import LogOut from "../../components/log-out/log-out.component";

// Constants
import { routes } from "./custom-router.routes";

const UserPage = () => {
  return <h3>UserPage</h3>;
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
  const firebaseUserData = useSelector((state) => state.firebase.auth);
  const userData = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const isManager = userData && userData.isManager;

  useEffect(() => {
    if (!firebaseUserData.isEmpty) {
      dispatch(
        getData({
          email: firebaseUserData.email,
        })
      );
    }
  }, [firebaseUserData, dispatch]);

  return (
    <section>
      <BrowserRouter>
        <header className="App-header">
          {!firebaseUserData.isEmpty && <LogOut />}
        </header>
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

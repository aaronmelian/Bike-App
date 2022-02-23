// React
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Components
import LogInPage from "../../views/login-page/login-page.component";
import SignUpPage from "../../views/sign-up-page/sign-up-page.component";
import LogOut from "../../components/LogOut/LogOut";

// Constants
import { routes } from "./custom-router.routes";

function UserPage() {
  return <h3>UserPage</h3>;
}

function RequireAuth({ children }) {
  const firebaseUserData = useSelector((state) => state.firebase.auth);

  if (firebaseUserData.isEmpty) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return children;
}

function CantBeAuth({ children }) {
  const firebaseUserData = useSelector((state) => state.firebase.auth);

  if (!firebaseUserData.isEmpty) {
    return <Navigate to={routes.USER} replace />;
  }

  return children;
}

const CustomRouter = () => {
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
              <RequireAuth>
                <UserPage />
              </RequireAuth>
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

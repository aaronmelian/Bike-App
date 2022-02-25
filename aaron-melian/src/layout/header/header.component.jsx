// React
import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import LogOut from "../../components/log-out/log-out.component";

// Constants
import { constants } from "./header.constants";

// Styles
import {
  AppTitleStyled,
  HeaderWrapperStyled,
  LogoutWrapperStyled,
} from "./header.component.styled";

const Header = () => {
  const firebaseUserData = useSelector((state) => state.firebase.auth);

  return (
    <HeaderWrapperStyled>
      <AppTitleStyled>{constants.APP_TITLE}</AppTitleStyled>
      <LogoutWrapperStyled>
        {!firebaseUserData.isEmpty && <LogOut />}
      </LogoutWrapperStyled>
    </HeaderWrapperStyled>
  );
};

export default Header;

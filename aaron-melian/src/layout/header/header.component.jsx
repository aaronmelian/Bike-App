// React
import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import LogOut from "../../components/log-out/log-out.component";
import UserPic from "../../components/user-pic/user-pic.component";

// Constants
import { constants } from "./header.constants";

// Styles
import {
  AppTitleStyled,
  HeaderWrapperStyled,
  LogoutWrapperStyled,
  UserPicWrapperStyled,
} from "./header.component.styled";

const Header = () => {
  const firebaseUserData = useSelector((state) => state.firebase.auth);

  return (
    <HeaderWrapperStyled>
      <AppTitleStyled>{constants.APP_TITLE}</AppTitleStyled>
      <LogoutWrapperStyled>
        {!firebaseUserData.isEmpty && <LogOut />}
        <UserPicWrapperStyled>
          <UserPic />
        </UserPicWrapperStyled>
      </LogoutWrapperStyled>
    </HeaderWrapperStyled>
  );
};

export default Header;

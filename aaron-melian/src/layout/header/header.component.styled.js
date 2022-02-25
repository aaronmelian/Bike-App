import styled from "styled-components";

export const AppTitleStyled = styled.h1`
  margin: 0 auto;
  margin-left: 20px;
  width: 100%;
  @media (min-width: 576px) {
    text-align: center;
    margin: 0;
  }
`;
AppTitleStyled.displayName = "AppTitleStyled";

export const HeaderWrapperStyled = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: 10vh;
`;
HeaderWrapperStyled.displayName = "HeaderWrapperStyled";

export const LogoutWrapperStyled = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  right: 10px;
`;
LogoutWrapperStyled.displayName = "LogoutWrapperStyled";

export const UserPicWrapperStyled = styled.div`
  margin-left: 8px;
`;
UserPicWrapperStyled.displayName = "UserPicWrapperStyled";

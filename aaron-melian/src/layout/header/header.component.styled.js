import styled from "styled-components";

export const AppTitleStyled = styled.h1`
  margin: 0 auto;
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
  position: absolute;
  right: 10px;
`;
LogoutWrapperStyled.displayName = "LogoutWrapperStyled";

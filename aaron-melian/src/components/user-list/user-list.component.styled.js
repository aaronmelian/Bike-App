import styled from "styled-components";

export const UserListWrapperStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 10px auto;
`;
UserListWrapperStyled.displayName = "UserListWrapperStyled";

export const UserWrapperStyled = styled.div`
  align-items: center;
  display: flex;
`;
UserWrapperStyled.displayName = "UserWrapperStyled";

export const UsernameTextStyled = styled.h4`
  background-color: "red";
  margin: 10px auto;
  text-align: center;
  z-index: 900;
`;
UsernameTextStyled.displayName = "UsernameTextStyled";

export const UserPicWrapperStyled = styled.div`
  position: absolute;
`;
UserPicWrapperStyled.displayName = "UserPicWrapperStyled";

export const UserInfoWrapperStyled = styled.div`
  position: absolute;
  right: 16px;
`;
UserInfoWrapperStyled.displayName = "UserInfoWrapperStyled";

export const IconWrapperStyled = styled.div`
  cursor: pointer;
  width: 40px;
`;
IconWrapperStyled.displayName = "IconWrapperStyled";

export const NoMatchingResultsTextStyled = styled.p`
  cursor: pointer;
  margin: 60px auto;
  font-size: 150%;
  font-weight: 700;
`;
NoMatchingResultsTextStyled.displayName = "NoMatchingResultsTextStyled";

export const ButtonWrapperStyled = styled.div`
  justify-content: center;
  margin: 0 auto;
  margin-top: 12px;
  width: 100%;
`;
ButtonWrapperStyled.displayName = "ButtonWrapperStyled";

export const userPickStyled = {
  cursor: "pointer",
};

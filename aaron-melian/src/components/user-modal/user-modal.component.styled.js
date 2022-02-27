import styled from "styled-components";

export const FormContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
FormContentWrapper.displayName = "FormContentWrapper";

export const UserPicWrapperStyled = styled.div`
  padding: 20px;
`;
UserPicWrapperStyled.displayName = "UserPicWrapperStyled";

export const userModalStyles = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
  width: "200px",
};

export const formItemStyles = {
  marginBottom: "10px",
};

export const ErrorTextStyled = styled.p`
  color: red;
  font-size: 90%;
  font-weight: 600;
  text-align: left;
`;
ErrorTextStyled.displayName = "ErrorTextStyled";

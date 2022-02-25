import styled from "styled-components";

export const UserPicWrapper = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  @media (min-width: 576px) {
    display: flex;
  }
`;
UserPicWrapper.displayName = "UserPicWrapper";

export const imageStyles = {
  borderRadius: "50%",
};

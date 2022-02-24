// React
import React from "react";

// Styles
import styled from "styled-components";

const BackdropWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
BackdropWrapper.displayName = "BackdropWrapper";

const Backdrop = (props) =>
  props.show ? <BackdropWrapper>{props.children}</BackdropWrapper> : null;

export default Backdrop;

// React
import React from "react";

// Styles
import styled from "styled-components";

const BackdropWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
`;
BackdropWrapper.displayName = "BackdropWrapper";

const Backdrop = (props) =>
  props.show ? <BackdropWrapper>{props.children}</BackdropWrapper> : null;

export default Backdrop;

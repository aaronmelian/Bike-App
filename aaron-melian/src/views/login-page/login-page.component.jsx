// React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions/authActions";

// Constants
import { constants } from "./login-page.constants";
import { routes } from "../../hoc/customRouter/custom-router.routes";

// Antd
import { Button, Form, Input } from "antd";

// Styles
import {
  ErrorTextStyled,
  FormWrapperStyled,
  LoginButtonWrapperStyled,
  signUpLinkStyled,
  SignUpLinkWrapperStyled,
  WelcomeTextStyled,
} from "./login-page.component.styled";

const LogInPage = () => {
  const [logInError, setLogInError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.authError);

  const onFinish = (values) => {
    handleLogin(values);
  };

  const handleLogin = async (values) => {
    clearErrors();
    const { email, password } = values;
    let formReady = true;
    if (!email) {
      formReady = false;
      setEmailError(constants.LOGIN_FORM_ERROR_TEXTS.EMAIL_FILL);
    }
    if (!password) {
      formReady = false;
      setPasswordError(constants.LOGIN_FORM_ERROR_TEXTS.PASSWORD_FILL);
    }
    formReady &&
      dispatch(
        signIn({
          ...values,
        })
      );
  };

  const clearErrors = () => {
    setLogInError("");
    setEmailError("");
    setPasswordError("");
  };

  useEffect(() => {
    if (authError && authError.err.code) {
      if (constants.AUTH_ERROR_TYPES.USER_ERRORS.includes(authError.err.code)) {
        setLogInError(constants.AUTH_ERROR_TEXTS.USER_ERRORS);
      } else if (
        constants.AUTH_ERROR_TYPES.PASSWORD_ERRORS.includes(authError.err.code)
      )
        setLogInError(constants.AUTH_ERROR_TEXTS.PASSWORD_ERRORS);
    }
  }, [authError]);

  return (
    <FormWrapperStyled>
      <WelcomeTextStyled>{constants.WELCOME_MESSAGE_TEXT}</WelcomeTextStyled>
      <Form
        name={constants.FORM_NAME}
        initialValues={{
          email: "managertest@test.com",
          password: "123456",
        }}
        onFinish={onFinish}
      >
        <Form.Item {...constants.EMAIL_INPUT_PROPS}>
          <Input />
        </Form.Item>
        <ErrorTextStyled>{emailError}</ErrorTextStyled>

        <Form.Item {...constants.PASSWORD_INPUT_PROPS}>
          <Input.Password />
        </Form.Item>
        <ErrorTextStyled>{passwordError}</ErrorTextStyled>
        <ErrorTextStyled>{logInError}</ErrorTextStyled>

        <Form.Item>
          <LoginButtonWrapperStyled>
            <Button {...constants.LOGIN_BUTTON_PROPS}>
              {constants.LOGIN_BUTTON_TEXT}
            </Button>
          </LoginButtonWrapperStyled>
        </Form.Item>
      </Form>
      <SignUpLinkWrapperStyled>
        {constants.NOT_SIGNED_UP_MESSAGE}
        <Link style={{ ...signUpLinkStyled }} to={routes.SIGN_UP}>
          {constants.SIGN_UP_LINK_TEXT}
        </Link>
      </SignUpLinkWrapperStyled>
    </FormWrapperStyled>
  );
};

export default LogInPage;

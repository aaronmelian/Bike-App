// React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Firebase
import firebase from "../../fbConfig";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions/authActions";

// Constants
import { constants } from "./login-page.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";
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

  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.authError);

  const onFinish = (values) => {
    handleLogin(values);
  };

  const handleLogin = async (values) => {
    clearErrors();
    let formReady = true;
    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(globalConstants.EMAIL, "==", values.email)
      .get()
      .then((resp) => {
        if (resp.docs[0] && resp.docs[0].data()) {
          const user = resp.docs[0].data();
          if (user.isDeleted) {
            setLogInError(constants.AUTH_ERROR_TEXTS.DELETED_USER);
            formReady = false;
          }
        }
      });
    if (formReady) {
      dispatch(
        signIn({
          ...values,
        })
      );
    }
  };

  const clearErrors = () => {
    setLogInError("");
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
          email: "",
          password: "",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.EMAIL_INPUT_PROPS}
          rules={[
            {
              required: true,
              message: constants.LOGIN_FORM_ERROR_TEXTS.PASSWORD_FILL,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.PASSWORD_INPUT_PROPS}
          rules={[
            {
              required: true,
              message: constants.LOGIN_FORM_ERROR_TEXTS.EMAIL_FILL,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
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

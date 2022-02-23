// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions/authActions";

// Antd
import { Form, Input, Button } from "antd";

// Constants
import { constants } from "./login-page.constants";
import { routes } from "../../hoc/customRouter/custom-router.routes";

function LogInPage() {
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
    <>
      <Form
        name={constants.FORM_NAME}
        initialValues={{
          email: "aaronimelian@gmail.comm",
          password: "123456",
        }}
        onFinish={onFinish}
      >
        <Form.Item {...constants.EMAIL_INPUT_PROPS}>
          <Input />
        </Form.Item>
        <p>{emailError}</p>

        <Form.Item {...constants.PASSWORD_INPUT_PROPS}>
          <Input.Password />
        </Form.Item>
        <p>{passwordError}</p>

        <Form.Item>
          <Button {...constants.LOGIN_BUTTON_PROPS}>
            {constants.LOGIN_BUTTON_TEXT}
          </Button>
        </Form.Item>
        <p>{logInError}</p>
      </Form>
      <p>
        {constants.NOT_SIGNED_UP_MESSAGE}
        <Link to={routes.SIGN_UP}>{constants.SIGN_UP_LINK_TEXT}</Link>
      </p>
    </>
  );
}

export default LogInPage;

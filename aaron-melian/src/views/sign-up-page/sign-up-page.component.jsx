// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Firebase
import firebase from "../../fbConfig";

// Axios
import axios from "axios";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";
import { constants } from "./sign-up-page.constants";
import { routes } from "../../hoc/customRouter/custom-router.routes";

// Antd
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Styles
import {
  ErrorTextStyled,
  FormWrapperStyled,
  loginLinkStyled,
  LoginLinkWrapperStyled,
  SignUpButtonWrapperStyled,
  WelcomeTextStyled,
} from "./sign-up-page.component.styled";

const SignUpPage = () => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorConfirmation, setEmailErrorConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorConfirmation, setPasswordErrorConfirmation] = useState(
    ""
  );
  const [imageUploaded, setImageUploaded] = useState("");

  const formFieldMatch = (data1, data2) => {
    return data1 === data2;
  };

  const handleSignUp = async (values) => {
    const {
      username,
      email,
      emailConfirmation,
      password,
      passwordConfirmation,
    } = values;
    clearErrors();
    let formReady = true;

    if (password.length < 6) {
      formReady = false;
      setPasswordError(constants.SIGN_UP_FORM_ERROR_TEXTS.PASSWORD_WEAK);
    }

    if (!formFieldMatch(email, emailConfirmation)) {
      formReady = false;
      setEmailErrorConfirmation(constants.SIGN_UP_FORM_ERROR_TEXTS.EMAIL_MATCH);
    }
    if (!formFieldMatch(password, passwordConfirmation)) {
      formReady = false;
      setPasswordErrorConfirmation(
        constants.SIGN_UP_FORM_ERROR_TEXTS.PASSWORD_MATCH
      );
    }

    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(constants.USERNAME_INPUT_PROPS.name, "==", username)
      .get()
      .then((resp) => {
        if (resp.docs[0] && resp.docs[0].data()) {
          setUsernameError(constants.SIGN_UP_CALL_ERROR_TEXTS.USERNAME_TAKEN);
          formReady = false;
        }
      });

    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(constants.EMAIL_INPUT_PROPS.name, "==", email)
      .get()
      .then((resp) => {
        if (resp.docs[0] && resp.docs[0].data()) {
          setEmailError(constants.SIGN_UP_CALL_ERROR_TEXTS.EMAIL_TAKEN);
          formReady = false;
        }
      });

    if (formReady) {
      let imgUrl = "";
      if (values.upload && values.upload.length > 0) {
        imgUrl = values.upload[0].thumbUrl;
      } else {
        imgUrl = await getRandomProfileImage();
      }

      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const auths = firebase.auth();
          const { uid } = auths.currentUser;
          firebase
            .firestore()
            .collection(globalConstants.COLLECTIONS.USERS)
            .doc(uid)
            .set({
              username,
              email,
              uid,
              imgUrl,
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          switch (err.code) {
            case constants.SIGN_UP_CALL_ERROR_CASES.INVALID_EMAIL:
              setEmailError(constants.SIGN_UP_CALL_ERROR_TEXTS.BAD_EMAIL);
              break;
            case constants.SIGN_UP_CALL_ERROR_CASES.WEAK_PASSWORD:
              setPasswordError(
                constants.SIGN_UP_CALL_ERROR_TEXTS.WEAK_PASSWORD
              );
              break;
            default:
              break;
          }
        });
    }
  };

  const onFinish = (values) => {
    handleSignUp(values);
  };

  const clearErrors = () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setEmailErrorConfirmation("");
    setPasswordErrorConfirmation("");
  };

  const getRandomProfileImage = async () => {
    const userData = await axios.get(globalConstants.USER_PICTURE_ENDPOINT);
    if (userData.data && userData.data.results[0]) {
      return userData.data.results[0].picture.large;
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handlePicChange = (e) => {
    if (!e.fileList.length) {
      setImageUploaded("");
    } else {
      setTimeout(() => {
        setImageUploaded(e.fileList[0].thumbUrl);
      }, 50);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess(constants.OK_TEXT);
    }, 0);
  };

  return (
    <FormWrapperStyled>
      <WelcomeTextStyled>{constants.WELCOME_MESSAGE_TEXT}</WelcomeTextStyled>
      <Form
        name={constants.FORM_NAME}
        initialValues={{
          username: "",
          email: "",
          emailConfirmation: "",
          password: "",
          passwordConfirmation: "",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.USERNAME_INPUT_PROPS}
          rules={[
            {
              required: true,
              message: constants.SIGN_UP_FORM_ERROR_TEXTS.USERNAME_FILL,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <ErrorTextStyled>{usernameError}</ErrorTextStyled>

        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.EMAIL_INPUT_PROPS}
          rules={[
            {
              required: true,
              message: constants.SIGN_UP_FORM_ERROR_TEXTS.EMAIL_FILL,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <ErrorTextStyled>{emailError}</ErrorTextStyled>

        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.EMAIL_CONFIRMATION_INPUT_PROPS}
          rules={[
            {
              required: true,
              message:
                constants.SIGN_UP_FORM_ERROR_TEXTS.EMAIL_CONFIRMATION_FILL,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <ErrorTextStyled>{emailErrorConfirmation}</ErrorTextStyled>

        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.PASSWORD_INPUT_PROPS}
          rules={[
            {
              required: true,
              message: constants.SIGN_UP_FORM_ERROR_TEXTS.PASSWORD_FILL,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <ErrorTextStyled>{passwordError}</ErrorTextStyled>

        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.PASSWORD_CONFIRMATION_INPUT_PROPS}
          rules={[
            {
              required: true,
              message:
                constants.SIGN_UP_FORM_ERROR_TEXTS.PASSWOR_CONFIRMATION_FILL,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <ErrorTextStyled>{passwordErrorConfirmation}</ErrorTextStyled>
        <Form.Item
          labelCol={{ span: 24 }}
          {...constants.UPLOAD_FORM_ITEM_PROPS}
          getValueFromEvent={normFile}
        >
          <Upload
            customRequest={dummyRequest}
            onChange={handlePicChange}
            {...constants.UPLOAD_PROPS}
          >
            {!imageUploaded && <PlusOutlined />}
          </Upload>
        </Form.Item>

        <Form.Item labelCol={{ span: 24 }}>
          <SignUpButtonWrapperStyled>
            <Button {...constants.SIGN_UP_BUTTON_PROPS}>
              {constants.SIGN_UP_BUTTON_TEXT}
            </Button>
          </SignUpButtonWrapperStyled>
        </Form.Item>
      </Form>
      <LoginLinkWrapperStyled>
        {constants.ALREADY_SIGNED_UP_MESSAGE}
        <Link style={{ ...loginLinkStyled }} to={routes.LOGIN}>
          {constants.LOGIN_LINK_TEXT}
        </Link>
      </LoginLinkWrapperStyled>
    </FormWrapperStyled>
  );
};

export default SignUpPage;

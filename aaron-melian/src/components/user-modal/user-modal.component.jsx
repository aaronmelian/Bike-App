// React
import React, { useState } from "react";

// Redux
import { getUsers } from "../../store/actions/userActions";
import { getBikes } from "../../store/actions/bikeActions";
import { getLoggedUserData } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { fireAPI } from "../../fbConfig";

// Components
import Backrop from "../backdrop/backdrop.component";
import UserPic from "../user-pic/user-pic.component";

// Constants
import { constants } from "../user-modal/user-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// AntD
import { Checkbox, Form, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Styles
import {
  ErrorTextStyled,
  FormContentWrapper,
  formItemStyles,
  UserPicWrapperStyled,
  userModalStyles,
} from "./user-modal.component.styled";

const UserModal = ({ cancelUserModal, editing, title, show, userData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [imageUploaded, setImageUploaded] = useState("");

  const addUser = async (userFormData) => {
    handleCreateUser(userFormData);
  };

  const clearErrors = () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleCreateUser = async (userFormData) => {
    clearErrors();
    let formReady = true;
    if (userFormData.password.length < 6) {
      formReady = false;
      setPasswordError(constants.SIGN_UP_FORM_ERROR_TEXTS.PASSWORD_WEAK);
    }

    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(constants.USERNAME_INPUT_PROPS.name, "==", userFormData.username)
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
      .where(constants.EMAIL_INPUT_PROPS.name, "==", userFormData.email)
      .get()
      .then((resp) => {
        if (resp.docs[0] && resp.docs[0].data()) {
          setEmailError(constants.SIGN_UP_CALL_ERROR_TEXTS.EMAIL_TAKEN);
          formReady = false;
        }
      });

    if (formReady) {
      const config = {
        ...fireAPI,
      };
      const secondaryApp = firebase.initializeApp(
        config,
        constants.SECONDARY_INITIALIZE
      );
      secondaryApp
        .auth()
        .createUserWithEmailAndPassword(
          userFormData.email,
          userFormData.password
        )
        .then((firebaseUser) => {
          firebase
            .firestore()
            .collection(globalConstants.COLLECTIONS.USERS)
            .doc(firebaseUser.user.uid)
            .set({
              username: userFormData.username,
              email: userFormData.email,
              uid: firebaseUser.user.uid,
              imgUrl: userFormData.upload[0].thumbUrl,
              isManager: !!userFormData.manager,
              isDeleted: false,
            })
            .catch((error) => {
              console.log(error);
            });
          secondaryApp.auth().signOut();

          message.success(constants.SIGN_UP_SUCCESS_MESSAGE);
          dispatch(getUsers());
          form.resetFields();
          setImageUploaded("");
          cancelUserModal();
        })
        .catch((err) => {
          console.log(err);
          message.error(constants.SIGN_UP_ERROR_MESSAGE);
          switch (err.code) {
            case constants.SIGN_UP_CALL_ERROR_CASES.INVALID_EMAIL:
              setEmailError(constants.SIGN_UP_CALL_ERROR_TEXTS.BAD_EMAIL);
              break;
            default:
              break;
          }
        });
    }
  };

  const editUser = async (userFormData) => {
    clearErrors();
    let formReady = true;
    await firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .where(constants.USERNAME_INPUT_PROPS.name, "==", userFormData.username)
      .get()
      .then((resp) => {
        if (
          resp.docs[0] &&
          resp.docs[0].data() &&
          resp.docs[0].data().uid !== userData.uid
        ) {
          setUsernameError(constants.SIGN_UP_CALL_ERROR_TEXTS.USERNAME_TAKEN);
          formReady = false;
        }
      });

    // Udate User
    if (formReady) {
      let newUserData = { username: userFormData.username };
      if (userFormData.upload) {
        newUserData.imgUrl = userFormData.upload[0].thumbUrl;
      }
      firebase
        .firestore()
        .collection(globalConstants.COLLECTIONS.USERS)
        .doc(userData.uid)
        .update({
          ...newUserData,
        })
        .then(() => {
          message.success(constants.EDIT_USER_SUCCESS_MESSAGE);
          form.resetFields();
          dispatch(getUsers());
          dispatch(getBikes());
          dispatch(
            getLoggedUserData({
              email: userInfo.email,
            })
          );
          setImageUploaded("");
          cancelUserModal();
        })
        .catch((err) => {
          message.success(constants.EDIT_USER_ERROR_MESSAGE);
        });
    }
  };

  const handleOk = (userFormData) => {
    if (editing) {
      editUser(userFormData);
    } else {
      addUser(userFormData);
    }
  };
  const onCancel = () => {
    cancelUserModal();
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
    <Backrop show={show}>
      <Modal
        title={title}
        visible={show}
        {...constants.MODAL_PROPS}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOk(values);
            })
            .catch((info) => {
              console.log(constants.VALIDATE_FAILED_TEXT, info);
            });
        }}
      >
        <FormContentWrapper>
          {userData && userData.imgUrl && (
            <UserPicWrapperStyled>
              <UserPic
                picUrl={imageUploaded || userData.imgUrl}
                large={true}
                deleted={userData.isDeleted}
              />
            </UserPicWrapperStyled>
          )}
          <Form
            form={form}
            id={constants.FORM_NAME}
            name={constants.FORM_NAME}
            initialValues={{
              username: (userData && userData.username) || "",
              email: (userData && userData.email) || "",
            }}
            style={{
              ...userModalStyles,
            }}
          >
            <Form.Item
              labelCol={{ span: 24 }}
              {...constants.USERNAME_INPUT_PROPS}
              rules={[
                {
                  required: true,
                  message: constants.USERNAME_INPUT_VALIDATE_MESSAGE,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <ErrorTextStyled>{usernameError}</ErrorTextStyled>

            {!editing && (
              <>
                <Form.Item
                  labelCol={{ span: 24 }}
                  {...constants.EMAIL_INPUT_PROPS}
                  rules={[
                    {
                      required: true,
                      message: constants.EMAIL_INPUT_VALIDATE_MESSAGE,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <ErrorTextStyled>{emailError}</ErrorTextStyled>
              </>
            )}

            {!editing && (
              <>
                <Form.Item
                  labelCol={{ span: 24 }}
                  style={{
                    ...formItemStyles,
                  }}
                  {...constants.PASSWORD_INPUT_PROPS}
                  rules={[
                    {
                      required: true,
                      message: constants.PASSWORD_INPUT_VALIDATE_MESSAGE,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <ErrorTextStyled>{passwordError}</ErrorTextStyled>
              </>
            )}

            {!editing && (
              <Form.Item
                labelCol={{ span: 24 }}
                name={constants.MANAGER_INPUT_PROPS.name}
                valuePropName={constants.MANAGER_INPUT_PROPS.valuePropName}
              >
                <Checkbox>{constants.MANAGER_INPUT_PROPS.label}</Checkbox>
              </Form.Item>
            )}

            <Form.Item
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: !editing,
                  message: constants.UPLOAD_INPUT_VALIDATE_MESSAGE,
                },
              ]}
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
          </Form>
        </FormContentWrapper>
      </Modal>
    </Backrop>
  );
};

export default UserModal;

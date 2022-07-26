export const constants = {
  FORM_NAME: "userForm",
  MODAL_PROPS: {
    okText: "Confirm",
    cancelText: "Cancel",
  },
  VALIDATE_FAILED_TEXT: "Validate Failed:",

  USERNAME_INPUT_PROPS: {
    label: "Name",
    name: "username",
  },
  USERNAME_INPUT_VALIDATE_MESSAGE: "Please fill the username field.",

  EMAIL_INPUT_PROPS: {
    label: "Email",
    name: "email",
  },
  EMAIL_INPUT_VALIDATE_MESSAGE: "Please fill the email field.",

  PASSWORD_INPUT_PROPS: {
    label: "Password",
    name: "password",
  },
  PASSWORD_INPUT_VALIDATE_MESSAGE: "Please fill the password field.",

  MANAGER_INPUT_PROPS: {
    label: "Manager",
    name: "manager",
    valuePropName: "checked",
  },
  UPLOAD_FORM_ITEM_PROPS: {
    name: "upload",
    label: "Profile Picture",
    valuePropName: "fileList",
  },
  UPLOAD_INPUT_VALIDATE_MESSAGE: "Please upload the user picture.",
  UPLOAD_PROPS: {
    listType: "picture-card",
    name: "logo",
    action: "/upload.do",
  },

  SIGN_UP_BUTTON_TEXT: "Create User",
  SIGN_UP_CALL_ERROR_CASES: {
    INVALID_EMAIL: "auth/invalid-email",
  },
  SIGN_UP_FORM_ERROR_TEXTS: {
    PASSWORD_WEAK: "Password should be at least 6 characters.",
  },
  SIGN_UP_CALL_ERROR_TEXTS: {
    USERNAME_TAKEN: "Username is already in use.",
    EMAIL_TAKEN: "Email is already in use.",
    BAD_EMAIL: "The email address is badly formatted.",
  },
  SIGN_UP_ERROR_MESSAGE: "User creation failed!",
  SIGN_UP_SUCCESS_MESSAGE: "User created succesfully!",
  EDIT_USER_ERROR_MESSAGE: "User udpate failed.",
  EDIT_USER_SUCCESS_MESSAGE: "User udpated succesfully.",
  SECONDARY_INITIALIZE: "Secondary",
  OK_TEXT: "ok",
};

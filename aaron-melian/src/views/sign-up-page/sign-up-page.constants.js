export const constants = {
  FORM_NAME: "signUp",
  USERNAME_INPUT_PROPS: {
    label: "Name",
    name: "username",
  },
  EMAIL_INPUT_PROPS: {
    label: "Email",
    name: "email",
  },
  EMAIL_CONFIRMATION_INPUT_PROPS: {
    label: "Confirm Email",
    name: "emailConfirmation",
  },
  PASSWORD_INPUT_PROPS: {
    label: "Password",
    name: "password",
  },
  PASSWORD_CONFIRMATION_INPUT_PROPS: {
    label: "Confirm Password",
    name: "passwordConfirmation",
  },
  UPLOAD_FORM_ITEM_PROPS: {
    name: "upload",
    label: "Profile Picture",
    valuePropName: "fileList",
  },
  UPLOAD_PROPS: {
    listType: "picture-card",
    name: "logo",
    action: "/upload.do",
  },
  SIGN_UP_BUTTON_PROPS: {
    type: "primary",
    htmlType: "submit",
  },
  SIGN_UP_BUTTON_TEXT: "Sign Up",

  LOGIN_LINK_TEXT: "Log In!",
  ALREADY_SIGNED_UP_MESSAGE: "Already have an account? ",

  SIGN_UP_FORM_ERROR_TEXTS: {
    USERNAME_FILL: "Please fill your username.",
    EMAIL_FILL: "Please fill your email.",
    EMAIL_CONFIRMATION_FILL: "Please repeat your email.",
    PASSWORD_FILL: "Please fill your password.",
    PASSWOR_CONFIRMATION_FILL: "Please repeat your password.",
    PASSWORD_WEAK: "Password should be at least 6 characters.",
    PASSWORD_MATCH: "Passwords must match.",
    EMAIL_MATCH: "Emails must match.",
  },
  SIGN_UP_CALL_ERROR_TEXTS: {
    USERNAME_TAKEN: "Username is already in use.",
    EMAIL_TAKEN: "Email is already in use.",
    BAD_EMAIL: "The email address is badly formatted.",
    WEAK_PASSWORD: "Password should be at least 6 characters.",
  },
  SIGN_UP_CALL_ERROR_CASES: {
    INVALID_EMAIL: "auth/invalid-email",
    WEAK_PASSWORD: "auth/weak-password",
  },
  WELCOME_MESSAGE_TEXT:
    "Almost there, please Sign Up so you can access our service!",
};

export const constants = {
  FORM_NAME: "login",
  EMAIL_INPUT_PROPS: {
    label: "Email",
    name: "email",
  },
  PASSWORD_INPUT_PROPS: {
    label: "Password",
    name: "password",
  },
  LOGIN_BUTTON_PROPS: {
    type: "primary",
    htmlType: "submit",
  },
  LOGIN_BUTTON_TEXT: "Login",
  SIGN_UP_LINK_TEXT: "Sign Up!",
  NOT_SIGNED_UP_MESSAGE: "Do not have an account yet? ",
  LOGIN_FORM_ERROR_TEXTS: {
    EMAIL_FILL: "Please fill your email.",
    PASSWORD_FILL: "Please fill your password.",
  },
  AUTH_ERROR_TYPES: {
    USER_ERRORS: [
      "auth/invalid-email",
      "auth/user-disabled",
      "auth/user-not-found",
      "auth/google-linked",
    ],
    PASSWORD_ERRORS: ["auth/wrong-password"],
  },
  AUTH_ERROR_TEXTS: {
    USER_ERRORS: "Invalid Email",
    PASSWORD_ERRORS: "Invalid Password",
  },
};

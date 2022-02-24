export const constants = {
  FORM_NAME: "signUp",
  USERNAME_INPUT_PROPS: {
    label: "Username",
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
    PASSWORD_FILL: "Please fill your password.",
    PASSWORD_MATCH: "Passwords must match.",
    EMAIL_MATCH: "Emails must match.",
  },
  SIGN_UP_CALL_ERROR_TEXTS: {
    USERNAME_TAKEN: "Username is already in use, choose another one or log in.",
    EMAIL_TAKEN: "Email is already in use, choose another one or log in.",
    BAD_EMAIL: "The email address is badly formatted.",
    WEAK_PASSWORD: "Password should be at least 6 characters.",
  },
  SIGN_UP_CALL_ERROR_CASES: {
    INVALID_EMAIL: "auth/invalid-email",
    WEAK_PASSWORD: "auth/weak-password",
  },
};

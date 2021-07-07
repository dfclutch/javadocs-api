const { isEmpty } = require("lodash");

export function vaildateLoginInput(data) {
  const errors = {};
  if (!data.username) {
    errors.username = "Username field is required";
  }

  if (typeof data.username !== 'string') {
    errors.username = "Invalid username";
  }

  if (!data.password) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
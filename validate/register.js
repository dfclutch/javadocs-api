const { isEmpty } = require("lodash");

module.exports = function vaildateRegisterInput(data) {
  const errors = {};
  if (typeof data.username !== 'string') {
    errors.username = "Invalid username";
  }
  if (!data.username) {
    errors.username = "Username field is required";
  }
  if (!data.password) {
    errors.password = "Password field is required";
  }

  if (!data.password2) {
    errors.password2 = "Confirm password field is required";
  }
  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (data.password !== data.password2) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
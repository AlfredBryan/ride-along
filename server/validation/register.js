import Validator from "validator";

const validateRegisterInput = data => {
  const errors = {};

  if (
    !Validator.isLength(data.surname, {
      min: 2,
      max: 15
    })
  ) {
    errors.surname = "Surname must be between 2 and 15 characters";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "surname field is required";
  }

  if (
    !Validator.isLength(data.first_name, {
      min: 2,
      max: 15
    })
  ) {
    errors.first_name = "first name must be between 2 and 15 characters";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isEmpty(data.password)) {
    if (
      !Validator.isLength(data.password, {
        min: 6,
        max: 30
      })
    ) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: Validator.isEmpty(errors)
  };
};

export default validateRegisterInput;

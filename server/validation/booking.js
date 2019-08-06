import Validator from "validator";

const validateBookingInput = data => {
  const errors = {};

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "surname field is required";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "first name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  return {
    errors,
    isValid: Validator.isEmpty(errors)
  };
};

export default validateBookingInput;

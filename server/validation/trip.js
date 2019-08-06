import Validator from "validator";

const validateTripInput = data => {
  const errors = {};

  if (Validator.isEmpty(data.origin)) {
    errors.origin = "origin field is required";
  }

  if (Validator.isEmpty(data.destination)) {
    errors.destination = "destination field is required";
  }

  if (Validator.isEmpty(data.fare)) {
    errors.fare = "fare field is required";
  }

  if (Validator.isEmpty(data.departure_time)) {
    errors.fare = "departure time field is required";
  }

  return {
    errors,
    isValid: Validator.isEmpty(errors)
  };
};

export default validateTripInput;

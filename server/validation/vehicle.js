import Validator from "validator";

const validateVehicleInput = data => {
  const errors = {};

  if (Validator.isEmpty(data.plate_number)) {
    errors.plate_number = "plate_number field is required";
  }

  if (Validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = "manufacturer field is required";
  }

  if (Validator.isEmpty(data.model)) {
    errors.model = "model field is required";
  }

  if (Validator.isEmpty(data.year)) {
    errors.year = "year field is required";
  }

  if (Validator.isEmpty(data.capacity)) {
    errors.capacity = "capacity field is required";
  }

  return {
    errors,
    isValid: Validator.isEmpty(errors)
  };
};

export default validateVehicleInput;

interface reset_password_by_phone_number_validator {
  validate: validator_proxy<{
    phone_number: string;
    code: string;
    new_password: string;
  }>;
}

export default reset_password_by_phone_number_validator;

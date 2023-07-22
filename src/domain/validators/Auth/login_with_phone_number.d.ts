interface login_with_phone_number_validator {
  validate: validator_proxy<{
    phone_number: string;
    password: string;
  }>;
}

export default login_with_phone_number_validator;

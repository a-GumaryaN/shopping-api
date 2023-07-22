interface password_less_by_phone_number_validator {
  validate: validator_proxy<{
    phone_number: string;
    code: string;
  }>;
}

export default password_less_by_phone_number_validator;

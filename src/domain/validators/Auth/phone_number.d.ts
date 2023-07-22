interface phone_number_validator {
  validate: validator_proxy<{
    phone_number: string;
  }>;
}

export default phone_number_validator;

interface email_validator {
  validate: validator_proxy<{
    email: string;
  }>;
}

export default email_validator;

interface login_with_email_validator {
  validate: validator_proxy<{
    email: string;
    password: string;
  }>;
}

export default login_with_email_validator;

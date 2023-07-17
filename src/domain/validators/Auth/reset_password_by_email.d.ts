interface reset_password_by_email_validator {
  validate: validator_proxy<{
    email: string;
    code: string;
    new_password: string;
  }>;
}

export default reset_password_by_email_validator;

interface password_less_login_by_email_validator {
  validate: validator_proxy<{
    email: string;
    code: string;
  }>;
}


export default password_less_login_by_email_validator;
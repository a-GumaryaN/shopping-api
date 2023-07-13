import validator_proxy from './validator.proxy';

interface auth_validator {
  login_with_email_validator: validator_proxy<{
    email: string;
    password: string;
  }>;

  login_with_phone_number_validator: validator_proxy<{
    phone_number: string;
    password: string;
  }>;

  email_validator: validator_proxy<email>;

  phone_number_validator: validator_proxy<phone_number>;

  password_less_login_by_email_validator: validator_proxy<{
    email: string;
    code: string;
  }>;

  password_less_by_phone_number_validator: validator_proxy<{
    phone_number: string;
    code: string;
  }>;

  reset_password_by_email_validator: validator_proxy<{
    email: string;
    code: string;
    new_password: string;
  }>;

  reset_password_by_phone_number_validator: validator_proxy<{
    phone_number: string;
    code: string;
    new_password: string;
  }>;
}

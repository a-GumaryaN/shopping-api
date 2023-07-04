interface auth_validator {
  login_with_email_validator(
    email: string,
    password: string,
  ): { error: any; value: { email: string; password: string } };

  login_with_phone_number_validator(
    phone_number: string,
    password: string,
  ): { error: any; value: { phone_number: string; password: string } };
}

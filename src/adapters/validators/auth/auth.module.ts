import { Module } from "@nestjs/common";
import Email_validator from "./email.service";
import Login_with_email_validator from "./login_with_email.service";
import Login_with_phone_number_validator from "./login_with_phone_number.service";
import Reset_password_by_phone_number_validator from "./reset_password_by_phone_number.service";
import Reset_password_by_email from "./reset_password_by_email.service";
import Phone_number_validator from "./phone_number.service";
import Password_less_by_email_validator from "./password_less_by_email.service";
import password_less_by_phone_number from "./password_less_by_phone_number.service";

@Module({
  providers: [
    Email_validator,
    Login_with_email_validator,
    Login_with_phone_number_validator,
    Reset_password_by_phone_number_validator,
    Reset_password_by_email,
    Phone_number_validator,
    Password_less_by_email_validator,
    password_less_by_phone_number
  ],
  exports: [
    Email_validator,
    Login_with_email_validator,
    Login_with_phone_number_validator,
    Reset_password_by_phone_number_validator,
    Reset_password_by_email,
    Phone_number_validator,
    Password_less_by_email_validator,
    password_less_by_phone_number
  ],
})
class Auth_validator {}

export default Auth_validator;

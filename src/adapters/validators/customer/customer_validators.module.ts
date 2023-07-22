import { Module } from "@nestjs/common";
import Register_by_email_validator from "./register_by_email_validator.service";
import Register_by_phone_number_validator from "./register_by_phone_number_validator.service";

@Module({
  providers: [Register_by_email_validator, Register_by_phone_number_validator],
  exports: [Register_by_email_validator, Register_by_phone_number_validator],
})
class Register_validator_module {}

export default Register_validator_module;

import { Module } from "@nestjs/common";
import Register_by_email_validator from "./register_by_email_validator.service";

@Module({
  providers: [
    Register_by_email_validator
  ],
  exports: [
    Register_by_email_validator
  ],
})
export class Auth_validator {}

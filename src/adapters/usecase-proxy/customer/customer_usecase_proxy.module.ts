import { DynamicModule, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import Code_repository from "src/adapters/repository/code_repository";
import Customer_repository from "src/adapters/repository/customer.repository";
import { Hash_service } from "src/adapters/services/bcrype/hash.service";
import { Code_generator_service } from "src/adapters/services/code_generator/code_generator.service";
import { Email_sender_service } from "src/adapters/services/email_sender/email_sender.service";
import { Jwt_token_service } from "src/adapters/services/jwt/jwt.service";
import { Sms_sender_service } from "src/adapters/services/sms_sender/sms_sender.service";
import Uuid_generator_service from "src/adapters/services/uuid/uuid_sender.service";
import Email_validator from "src/adapters/validators/auth/email.service";
import Register_by_email_validator from "src/adapters/validators/customer/register_by_email_validator.service";
import Get_register_code_by_email_usecase from "src/usecase/Customer/get_register_code_by_email";
import Get_register_code_by_phone_number from "src/usecase/Customer/get_register_code_by_phone_number";
import Register_by_email from "src/usecase/Customer/register_by_email";
import Register_by_phone_number from "src/usecase/Customer/register_by_phone_number";

@Module({
  imports: [],
})
class Usecase_proxy_module {
  static Get_register_code_by_email = "Get_register_code_by_email";
  static Get_register_code_by_phone_number =
    "Get_register_code_by_phone_number";
  static Register_by_email = "Register_by_email";
  static Register_by_phone_number = "Register_by_phone_number";
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [],
          provide: Usecase_proxy_module.Get_register_code_by_email,
          useFactory: () => {
            const code_repository = new Code_repository(),
              code_generator = new Code_generator_service(),
              email_service = new Email_sender_service(),
              email_validator = new Email_validator();

            return new Get_register_code_by_email_usecase(
              code_repository,
              code_generator,
              email_service,
              email_validator
            );
          },
        },
        {
          inject: [ ],
          provide: Usecase_proxy_module.Get_register_code_by_phone_number,
          useFactory: () => {
            const code_repository = new Code_repository(),
              code_generator = new Code_generator_service(),
              SMS_service = new Sms_sender_service(),
              validator = new Email_validator();

            return new Get_register_code_by_phone_number(
              code_repository,
              code_generator,
              SMS_service,
              validator
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Register_by_email,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              uuid_service = new Uuid_generator_service(),
              token_service = new Jwt_token_service(new JwtService()),
              hash_service = new Hash_service(),
              validator = new Register_by_email_validator();

            return new Register_by_email(
              customer_repository,
              code_repository,
              uuid_service,
              hash_service,
              token_service,
              validator
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Register_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              uuid_service = new Uuid_generator_service(),
              token_service = new Jwt_token_service(new JwtService()),
              hash_service = new Hash_service(),
              validator = new Register_by_email_validator();

            return new Register_by_phone_number(
              customer_repository,
              code_repository,
              uuid_service,
              hash_service,
              token_service,
              validator
            );
          },
        },
      ],
      exports: [
        Usecase_proxy_module.Get_register_code_by_email,
        Usecase_proxy_module.Get_register_code_by_phone_number,
        Usecase_proxy_module.Register_by_email,
        Usecase_proxy_module.Register_by_phone_number,
      ],
    };
  }
}

export default Usecase_proxy_module;

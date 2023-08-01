import { DynamicModule, Module } from "@nestjs/common";
import Code_repository from "src/adapters/repository/code_repository";
import Customer_repository from "src/adapters/repository/customer.repository";
import Repositories_module from "src/adapters/repository/repositories.module";
import Hash_module from "src/adapters/services/bcrype/hash.module";
import { Hash_service } from "src/adapters/services/bcrype/hash.service";
import Code_generator_module from "src/adapters/services/code_generator/code_generator.module";
import { Code_generator_service } from "src/adapters/services/code_generator/code_generator.service";
import { EmailSenderModule } from "src/adapters/services/email_sender/email_sender.module";
import { Email_sender_service } from "src/adapters/services/email_sender/email_sender.service";
import Jwt_module from "src/adapters/services/jwt/jwt.module";
import { Jwt_token_service } from "src/adapters/services/jwt/jwt.service";
import Sms_sender_module from "src/adapters/services/sms_sender/sms_sender.module";
import { Sms_sender_service } from "src/adapters/services/sms_sender/sms_sender.service";
import Uuid_service_module from "src/adapters/services/uuid/uuid_sender.module";
import Uuid_generator_service from "src/adapters/services/uuid/uuid_sender.service";
import Auth_validator from "src/adapters/validators/auth/auth.module";
import Email_validator from "src/adapters/validators/auth/email.service";
import Register_validator_module from "src/adapters/validators/customer/customer_validators.module";
import Register_by_email_validator from "src/adapters/validators/customer/register_by_email_validator.service";
import Get_register_code_by_email_usecase from "src/usecase/Customer/get_register_code_by_email";
import Get_register_code_by_phone_number from "src/usecase/Customer/get_register_code_by_phone_number";
import Register_by_email from "src/usecase/Customer/register_by_email";
import Register_by_phone_number from "src/usecase/Customer/register_by_phone_number";

@Module({
  imports: [
    Auth_validator,
    Repositories_module,
    Hash_module,
    Jwt_module,
    Uuid_service_module,
    Register_validator_module,
  ],
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
      imports: [Code_generator_module, EmailSenderModule, Sms_sender_module],
      providers: [
        {
          inject: [
            Code_repository,
            Code_generator_service,
            Email_sender_service,
            Email_validator,
          ],
          provide: Usecase_proxy_module.Get_register_code_by_email,
          useFactory: (
            code_repository: Code_repository,
            code_generator: Code_generator_service,
            email_service: Email_sender_service,
            email_validator: Email_validator
          ) => {
            return new Get_register_code_by_email_usecase(
              code_repository,
              code_generator,
              email_service,
              email_validator
            );
          },
        },
        {
          inject: [
            Code_repository,
            Code_generator_service,
            Sms_sender_service,
            Email_validator,
          ],
          provide: Usecase_proxy_module.Get_register_code_by_phone_number,
          useFactory: (
            code_repository: Code_repository,
            code_generator: Code_generator_service,
            SMS_service: Sms_sender_service,
            validator: Email_validator
          ) => {
            return new Get_register_code_by_phone_number(
              code_repository,
              code_generator,
              SMS_service,
              validator
            );
          },
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            Uuid_generator_service,
            Jwt_token_service,
            Hash_service,
            Register_by_email_validator,
          ],
          provide: Usecase_proxy_module.Register_by_email,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            uuid_service: Uuid_generator_service,
            token_service: Jwt_token_service,
            hash_service: Hash_service,
            validator: Register_by_email_validator
          ) =>
            new Register_by_email(
              customer_repository,
              code_repository,
              uuid_service,
              hash_service,
              token_service,
              validator
            ),
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            Uuid_generator_service,
            Jwt_token_service,
            Hash_service,
            Register_by_email_validator,
          ],
          provide: Usecase_proxy_module.Register_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            uuid_service: Uuid_generator_service,
            token_service: Jwt_token_service,
            hash_service: Hash_service,
            validator: Register_by_email_validator
          ) =>
            new Register_by_phone_number(
              customer_repository,
              code_repository,
              uuid_service,
              hash_service,
              token_service,
              validator
            ),
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

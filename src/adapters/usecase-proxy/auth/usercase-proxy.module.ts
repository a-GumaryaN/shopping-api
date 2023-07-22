import { Module, DynamicModule } from "@nestjs/common";
import Customer_repository from "../../repository/customer.repository";
import { Hash_service } from "../../services/bcrype/hash.service";
import { Jwt_token_service } from "../../services/jwt/jwt.service";
import { JwtService } from "@nestjs/jwt";
import { Sms_sender_service } from "../../services/sms_sender/sms_sender.service";
import { Code_generator_service } from "../../services/code_generator/code_generator.service";
import Code_repository from "src/adapters/repository/code_repository";
import {
  Get_login_code_by_phone_number,
  Get_reset_code_by_email,
  Get_reset_code_by_phone_number,
  Login_by_email,
  Login_by_phone_number,
  Password_less_login_by_email,
  Password_less_login_by_phone_number,
  Reset_password_by_email,
  Reset_password_by_phone_number,
} from "src/usecase/auth";
import Reset_password_by_phone_number_validator from "../../validators/auth/reset_password_by_phone_number.service";
import Password_less_by_email_validator from "../../validators/auth/password_less_by_email.service";
import Phone_number_validator from "../../validators/auth/phone_number.service";
import Email_validator from "../../validators/auth/email.service";
import Login_with_email_validator from "../../validators/auth/login_with_email.service";
import Login_with_phone_number_validator from "../../validators/auth/login_with_phone_number.service";
import password_less_by_phone_number from "../../validators/auth/password_less_by_phone_number.service";
import Reset_password_by_email_validator from "../../validators/auth/reset_password_by_email.service";
import Repositories_module from "src/adapters/repository/repositories.module";
import Sms_sender_module from "src/adapters/services/sms_sender/sms_sender.module";
import Code_generator_module from "src/adapters/services/code_generator/code_generator.module";
import Hash_module from "src/adapters/services/bcrype/hash.module";
import Jwt_module from "src/adapters/services/jwt/jwt.module";
import Product_validator_module from "src/adapters/validators/Product/product.module";
import Auth_validator from "src/adapters/validators/auth/auth.module";

@Module({
  imports: [
    Repositories_module,
    Product_validator_module,
    Jwt_module,
    Hash_module,
    Sms_sender_module,
    Code_generator_module,
    Auth_validator
  ],
})
class Usecase_proxy_module {
  static Get_login_code_by_phone_number = "Get_login_code_by_phone_number";
  // static Get_login_code_by_email = 'Get_login_code_by_email';
  static Get_reset_code_by_email = "Get_reset_code_by_email";
  static Get_reset_code_by_phone_number = "Get_reset_code_by_phone_number";
  static Login_by_email = "Login_by_email";
  static Login_by_phone_number = "Login_by_phone_number";
  static Password_less_login_by_email = "Password_less_login_by_email";
  static Password_less_login_by_phone_number =
    "Password_less_login_by_phone_number";
  static Reset_password_by_email = "Reset_password_by_email";
  static Reset_password_by_phone_number = "Reset_password_by_phone_number";
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [
            Customer_repository,
            Phone_number_validator,
            Sms_sender_service,
            Code_generator_service,
            Code_repository,
          ],
          provide: Usecase_proxy_module.Get_login_code_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            auth_validator: Phone_number_validator,
            sms_sender_service: Sms_sender_service,
            code_generator_service: Code_generator_service,
            code_repository: Code_repository
          ) =>
            new Get_login_code_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Email_validator,
            Sms_sender_service,
            Code_generator_service,
            Code_repository,
          ],
          provide: Usecase_proxy_module.Get_reset_code_by_email,
          useFactory: (
            customer_repository: Customer_repository,
            auth_validator: Email_validator,
            sms_sender_service: Sms_sender_service,
            code_generator_service: Code_generator_service,
            code_repository: Code_repository
          ) =>
            new Get_reset_code_by_email(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Phone_number_validator,
            Sms_sender_service,
            Code_generator_service,
            Code_repository,
          ],
          provide: Usecase_proxy_module.Get_reset_code_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            auth_validator: Phone_number_validator,
            sms_sender_service: Sms_sender_service,
            code_generator_service: Code_generator_service,
            code_repository: Code_repository
          ) =>
            new Get_reset_code_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Login_with_email_validator,
            Hash_service,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Login_by_email,
          useFactory: (
            customer_repository: Customer_repository,
            auth_validator: Login_with_email_validator,
            hash_service: Hash_service,
            jwt_token_service: Jwt_token_service
          ) =>
            new Login_by_email(
              customer_repository,
              auth_validator,
              hash_service,
              jwt_token_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Login_with_phone_number_validator,
            Hash_service,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Login_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            auth_validator: Login_with_phone_number_validator,
            hash_service: Hash_service,
            jwt_token_service: Jwt_token_service
          ) =>
            new Login_by_phone_number(
              customer_repository,
              auth_validator,
              hash_service,
              jwt_token_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            Password_less_by_email_validator,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Password_less_login_by_email,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            validator: Password_less_by_email_validator,
            token_service: Jwt_token_service
          ) =>
            new Password_less_login_by_email(
              customer_repository,
              code_repository,
              validator,
              token_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            password_less_by_phone_number,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Password_less_login_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            validator: password_less_by_phone_number,
            jwt_token_service: Jwt_token_service
          ) =>
            new Password_less_login_by_phone_number(
              customer_repository,
              code_repository,
              validator,
              jwt_token_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            Reset_password_by_email_validator,
            Hash_service,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Reset_password_by_email,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            validator: Reset_password_by_email_validator,
            hash_service: Hash_service,
            jwt_token_service: Jwt_token_service
          ) =>
            new Reset_password_by_email(
              customer_repository,
              code_repository,
              validator,
              hash_service,
              jwt_token_service
            ),
        },
        {
          inject: [
            Customer_repository,
            Code_repository,
            Reset_password_by_phone_number_validator,
            Hash_service,
            Jwt_token_service,
          ],
          provide: Usecase_proxy_module.Reset_password_by_phone_number,
          useFactory: (
            customer_repository: Customer_repository,
            code_repository: Code_repository,
            validator: Reset_password_by_phone_number_validator,
            hash_service: Hash_service,
            jwt_token_service: Jwt_token_service
          ) =>
            new Reset_password_by_phone_number(
              customer_repository,
              code_repository,
              validator,
              hash_service,
              jwt_token_service
            ),
        },
      ],
      exports: [
        // Usecase_proxy_module.Get_login_code_by_email,
        Usecase_proxy_module.Get_login_code_by_phone_number,
        Usecase_proxy_module.Get_reset_code_by_email,
        Usecase_proxy_module.Get_reset_code_by_phone_number,
        Usecase_proxy_module.Login_by_email,
        Usecase_proxy_module.Login_by_phone_number,
        Usecase_proxy_module.Password_less_login_by_email,
        Usecase_proxy_module.Password_less_login_by_phone_number,
        Usecase_proxy_module.Reset_password_by_email,
        Usecase_proxy_module.Reset_password_by_phone_number,
      ],
    };
  }
}

export default Usecase_proxy_module;

import { Module, DynamicModule } from '@nestjs/common';
import Customer_repository from '../repository/customer.repository';
import Auth_validator from 'src/adapters/validators/auth/auth.service';
import { Hash_service } from '../services/bcrype/hash.service';
import { Jwt_token_service } from '../services/jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { Sms_sender_service } from '../services/sms_sender/sms_sender.service';
import { Email_sender_service } from '../services/email_sender/email_sender.service';
import { Code_generator_service } from '../services/code_generator/code_generator.service';
import Code_repository from '../repository/code_repository';
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
} from 'src/usecase/auth';

@Module({
  imports: [Customer_repository],
})
class Usecase_proxy_module {
  static Get_login_code_by_phone_number = 'Get_login_code_by_phone_number';
  // static Get_login_code_by_email = 'Get_login_code_by_email';
  static Get_reset_code_by_email = 'Get_reset_code_by_email';
  static Get_reset_code_by_phone_number = 'Get_reset_code_by_phone_number';
  static Login_by_email = 'Login_by_email';
  static Login_by_phone_number = 'Login_by_phone_number';
  static Password_less_login_by_email = 'Password_less_login_by_email';
  static Password_less_login_by_phone_number =
    'Password_less_login_by_phone_number';
  static Reset_password_by_email = 'Reset_password_by_email';
  static Reset_password_by_phone_number = 'Reset_password_by_phone_number';
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [],
          provide: Usecase_proxy_module.Get_login_code_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              auth_validator = new Auth_validator(),
              sms_sender_service = new Sms_sender_service(),
              code_generator_service = new Code_generator_service(),
              code_repository = new Code_repository();

            return new Get_login_code_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Get_reset_code_by_email,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              auth_validator = new Auth_validator(),
              sms_sender_service = new Sms_sender_service(),
              code_generator_service = new Code_generator_service(),
              code_repository = new Code_repository();

            return new Get_reset_code_by_email(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Get_reset_code_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              auth_validator = new Auth_validator(),
              sms_sender_service = new Sms_sender_service(),
              code_generator_service = new Code_generator_service(),
              code_repository = new Code_repository();

            return new Get_reset_code_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              sms_sender_service,
              code_generator_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Login_by_email,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              auth_validator = new Auth_validator(),
              hash_service = new Hash_service(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Login_by_email(
              customer_repository,
              auth_validator,
              hash_service,
              jwt_token_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Login_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              auth_validator = new Auth_validator(),
              hash_service = new Hash_service(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Login_by_phone_number(
              customer_repository,
              auth_validator,
              hash_service,
              jwt_token_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Password_less_login_by_email,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              auth_validator = new Auth_validator(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Password_less_login_by_email(
              customer_repository,
              code_repository,
              auth_validator,
              jwt_token_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Password_less_login_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              auth_validator = new Auth_validator(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Password_less_login_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              jwt_token_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Reset_password_by_email,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              auth_validator = new Auth_validator(),
              hash_service = new Hash_service(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Reset_password_by_email(
              customer_repository,
              code_repository,
              auth_validator,
              hash_service,
              jwt_token_service,
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Reset_password_by_phone_number,
          useFactory: () => {
            const customer_repository = new Customer_repository(),
              code_repository = new Code_repository(),
              auth_validator = new Auth_validator(),
              hash_service = new Hash_service(),
              jwt_token_service = new Jwt_token_service(new JwtService());

            return new Reset_password_by_phone_number(
              customer_repository,
              code_repository,
              auth_validator,
              hash_service,
              jwt_token_service,
            );
          },
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

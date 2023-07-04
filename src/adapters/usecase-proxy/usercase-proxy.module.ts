import { Module, DynamicModule } from '@nestjs/common';
import Auth_use_case from 'src/use-cases/auth/auth.usecase';
import Customer_repository from '../repository/customer.repository';
import Auth_validator from 'src/adapters/validators/auth/auth.service';
import { Hash_service } from '../services/bcrype/hash.service';
import { Jwt_token_service } from '../services/jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [Customer_repository],
})
class Usecase_proxy_module {
  static Auth_use_case_proxy = 'Auth_use_case_proxy';
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [],
          provide: Usecase_proxy_module.Auth_use_case_proxy,
          useFactory: () =>
            new Auth_use_case(
              new Customer_repository(),
              new Auth_validator(),
              new Hash_service(),
              new Jwt_token_service(new JwtService()),
            ),
        },
      ],
      exports: [Usecase_proxy_module.Auth_use_case_proxy],
    };
  }
}

export default Usecase_proxy_module;

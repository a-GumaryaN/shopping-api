import { Module, Query } from '@nestjs/common';
import Customer_resolver from './customer.resolver';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/customer/customer_usecase_proxy.module';
import Jwt_module from 'src/adapters/services/jwt/jwt.module';

@Module({
  providers: [Customer_resolver],
  imports:[Usecase_proxy_module.register(),Jwt_module]
})
export class Customer_module {}

export default Customer_module;

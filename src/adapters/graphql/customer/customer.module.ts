import { Module, Query } from '@nestjs/common';
import Customer_resolver from './customer.resolver';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/customer/customer_usecase_proxy.module';

@Module({
  providers: [Customer_resolver],
  imports:[Usecase_proxy_module.register()]
})
export class Customer_module {}

export default Customer_module;

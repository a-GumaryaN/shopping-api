import { Module } from '@nestjs/common';
import Customer_resolver from './customer.resolver';

@Module({
  providers: [Customer_resolver],
})
export class Customer_module {}

export default Customer_module;

import { Module } from '@nestjs/common';
import order_resolver from './order.resolver';

@Module({
  providers: [order_resolver],
})
export class Order_module {}

export default Order_module;

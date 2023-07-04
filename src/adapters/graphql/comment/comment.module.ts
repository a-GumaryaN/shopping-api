import { Module } from '@nestjs/common';
import Order_resolver from './comment.resolver';

@Module({
  providers: [Order_resolver],
})
export class Order_module {}

export default Order_module;

import { Module } from '@nestjs/common';
import Comment_resolver from './comment.resolver';

@Module({
  providers: [Comment_resolver],
})
export class Order_module {}

export default Order_module;

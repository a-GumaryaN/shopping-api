import { Args, Query, Resolver } from '@nestjs/graphql';
import { Comment_schema } from './model/comment.schema';

@Resolver(() => Comment_schema)
class Order_resolver {
  constructor() {}
}

export default Order_resolver;

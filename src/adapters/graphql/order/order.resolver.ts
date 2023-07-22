import { Args, Query, Resolver } from '@nestjs/graphql';
import { Order_schema } from './model/order.model';

@Resolver((of) => Order_schema)
class Order_resolver {
  constructor() {}
}

export default Order_resolver;

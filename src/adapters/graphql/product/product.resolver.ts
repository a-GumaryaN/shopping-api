import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product_schema } from './model/product.model';

@Resolver((of) => Product_schema)
class Product_resolver {
  constructor() {}
 
}

export default Product_resolver;

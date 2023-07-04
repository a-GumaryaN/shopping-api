import { Module } from '@nestjs/common';
import Product_resolver from './product.resolver';

@Module({
  providers: [Product_resolver],
})
export class Product_module {}

export default Product_module;

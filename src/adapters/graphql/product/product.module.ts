import { Module } from '@nestjs/common';
import Product_resolver from './product.resolver';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/product/usercase-proxy.module';

@Module({
  providers: [Product_resolver],
  imports:[Usecase_proxy_module.register()]
})
export class Product_module {}

export default Product_module;

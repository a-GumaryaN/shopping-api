import { Module } from "@nestjs/common";
import Product_repository from "./product.repository";
import Customer_repository from "./customer.repository";
import Code_repository from "./code_repository";
import { MongooseModule } from "@nestjs/mongoose";
import { code, Code_schema } from "../entities/code.entity";
import { product, Product_schema } from "../entities/product.entity";
import { customer, Customer_schema } from "../entities/customer.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: code.name, schema: Code_schema },
      { name: product.name, schema: Product_schema },
      { name: customer.name, schema: Customer_schema },
    ]),
  ],
  providers: [Code_repository,Product_repository, Customer_repository],
  exports: [Code_repository,Product_repository, Customer_repository, ],
})
class Repositories_module {}

export default Repositories_module;

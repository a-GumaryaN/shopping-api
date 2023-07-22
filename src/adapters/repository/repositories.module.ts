import { Module } from "@nestjs/common";
import Product_repository from "./product.repository";
import Customer_repository from "./customer.repository";
import Code_repository from "./code_repository";

@Module({
  providers: [Product_repository, Customer_repository, Code_repository],
  exports: [Product_repository, Customer_repository, Code_repository],
})
class Repositories_module {}

export default Repositories_module;

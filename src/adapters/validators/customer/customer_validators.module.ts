import { Module } from "@nestjs/common";
import Update_product_validator from "./update_product.service";
import Delete_product_validator from "./delete_product.service";
import Add_product_validator from "./add_product.service";

@Module({
  providers: [
  ],
  exports: [
  ],
})
class Auth_validator {}

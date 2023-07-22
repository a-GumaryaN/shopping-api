import { Module } from "@nestjs/common";
import Update_product_validator from "./update_product.service";
import Delete_product_validator from "./delete_product.service";
import Add_product_validator from "./add_product.service";

@Module({
  providers: [
    Update_product_validator,
    Delete_product_validator,
    Add_product_validator,
  ],
  exports: [
    Update_product_validator,
    Delete_product_validator,
    Add_product_validator,
  ],
})
class Product_validator_module {}


export default Product_validator_module;
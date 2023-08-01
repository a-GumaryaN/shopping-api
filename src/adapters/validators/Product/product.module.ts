import { Module } from "@nestjs/common";
import Update_product_validator from "./update_product.service";
import Delete_product_validator from "./delete_product.service";
import Add_product_validator from "./add_product.service";
import Product_upload_images from "./product_upload_images.validator.service";

@Module({
  providers: [
    Update_product_validator,
    Delete_product_validator,
    Add_product_validator,
    Product_upload_images,
  ],
  exports: [
    Update_product_validator,
    Delete_product_validator,
    Add_product_validator,
    Product_upload_images
  ],
})
class Product_validator_module {}


export default Product_validator_module;
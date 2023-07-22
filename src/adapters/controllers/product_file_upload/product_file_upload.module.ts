import { Module } from "@nestjs/common";
import Product_file_upload_service from "./product_file_upload.controller";

@Module({
  providers: [Product_file_upload_service],
})
class Product_file_upload_module {}

export default Product_file_upload_module;

import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Jwt_token_service } from "src/adapters/services/jwt/jwt.service";
import File_upload_service from './file_upload.service';
import Product_file_upload_controller from "./file_upload.controller";
import Temp_cleanerM_module from "src/adapters/services/temp_cleaner/temp_cleaner.module";
import Product_validator_module from "src/adapters/validators/Product/product.module";
import Repositories_module from "src/adapters/repository/repositories.module";

@Module({
  providers: [Jwt_token_service,JwtService, File_upload_service],
  controllers:[Product_file_upload_controller],
  imports: [Temp_cleanerM_module,Product_validator_module,Repositories_module],
  exports:[File_upload_service]
})
class File_upload_module {}

export default File_upload_module;

import { Module } from "@nestjs/common";
import File_upload_service from "./product_file_upload.controller";
import { Jwt_token_service } from "src/adapters/services/jwt/jwt.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [File_upload_service],
  providers:[Jwt_token_service,JwtService]
})
class File_upload_module {}

export default File_upload_module;

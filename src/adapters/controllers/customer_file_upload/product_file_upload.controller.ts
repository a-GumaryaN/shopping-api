import {
  Body,
  Controller,
  Injectable,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import Rest_auth_guard from "src/adapters/common/guard/jwt/jwt.rest.guard";
import Product_file_upload_dto from "./product_file_upload.dto";
import Jwt_auth_guard from "src/adapters/common/guard/jwt_local.guard";

@Controller()
class File_upload_service {
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(Jwt_auth_guard)
  @Post("file")
  uploadFileAndPassValidation(
    @Body() body: Product_file_upload_dto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    return {
      body
    };
  }
}

export default File_upload_service;

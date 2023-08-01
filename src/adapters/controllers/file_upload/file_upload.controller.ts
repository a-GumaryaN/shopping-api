import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import Product_file_upload_dto from "./file_upload.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Temp_cleaner_interceptor } from "src/adapters/common/interceptors/temp_cleaner_interceptor";
import File_upload_service from "./file_upload.service";

@Controller("upload")
// @Roles("admin")
// @UseGuards(Rest_auth_guard,Rest_roles_guard)
class Product_file_upload_controller {
  constructor(private file_upload_service:File_upload_service) {}

  @Post("product-images")
  @UseInterceptors(
    Temp_cleaner_interceptor,
    FilesInterceptor("image[]", 5, { dest: "./temp/" })
  )
  async product_images_upload(
    @Body() body: Product_file_upload_dto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: new RegExp("image/(gif|jpe?g|tiff?|png|webp|bmp)$"),
          }),
        ],
      })
    )
    files: any
  ) {
    return await this.file_upload_service.product_upload_file(body, files);
  }

  @Post("customer-image")
  @UseInterceptors(
    Temp_cleaner_interceptor,
    FileInterceptor("image", { dest: "./temp/" })
  )
  async customer_image(
    @Body() body: Product_file_upload_dto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: new RegExp("image/(gif|jpe?g|tiff?|png|webp|bmp)$"),
          }),
        ],
      })
    )
    files: any
  ) {
    return await this.file_upload_service.product_upload_file(body, files);
  }
}

export default Product_file_upload_controller;

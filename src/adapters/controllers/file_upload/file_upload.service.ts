import {
  Body,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
  Req,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";
import Product_file_upload_dto from "./file_upload.dto";
import Product_upload_images from "src/adapters/validators/Product/product_upload_images.validator.service";
import Temp_cleaner_service from "src/adapters/services/temp_cleaner/temp_cleaner.service";
import { rename } from "fs";
import { join } from "path";
import Product_repository from "src/adapters/repository/product.repository";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { NotFoundError } from "rxjs";
import { Request } from "express";

@Injectable()
class File_upload_service {
  constructor(
    private validator: Product_upload_images,
    private temp_cleaner_service: Temp_cleaner_service,
    private product_repository: Product_repository
  ) {}

  async product_upload_file(
    @Body() body: Product_file_upload_dto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })],
      })
    )
    files: Array<Express.Multer.File>
  ) {
    // validate product uuid
    const { error, value } = this.validator.validate(body);
    if (error) {
      // this.temp_cleaner_service.clean_temp();
      return error;
    }

    const product = this.product_repository.find_one(
      { uuid: body.product_uuid },
      {}
    );
    //if product not exist then return error
    if (!product) {
      this.temp_cleaner_service.clean_temp();
      // ...product not exist error
    }
    //if product exist and has over than 6 image return overflow image error
    if (!product) {
      this.temp_cleaner_service.clean_temp();
      // ...overflow error
    }

    const images = [];

    files.forEach((file) => {
      const old_path = join("temp", file.filename);
      // generate unique name for all files
      const new_name = Date.now() + file.originalname;
      const new_path = join("upload/product", new_name);

      //push image link to images array
      images.push("/file/product-image" + new_name);

      // move file to product directory
      rename(old_path, new_path, function (err) {
        if (err) throw err;
      });
    });

    await this.product_repository.update_one(
      { uuid: value.product_uuid },
      { images }
    );

    return "files uploaded successfully  ";
  }


  async customer_upload_file(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })],
      })
    )
    files: Express.Multer.File,
    @Req()
    request:Request
  ) {
    //check existence of user
    // const uuid = 
    console.log(request)

    return "files uploaded successfully  ";
  }
}

export default File_upload_service;

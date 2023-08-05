import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response as Express_reponse_object } from "express";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

@Controller("file")
class File_controller {
  //route for get product image
  @Get("product/:product_uuid/:image")
  async product_image(
    @Param() { product_uuid, image }: any,
    @Res() res: Express_reponse_object
  ) {
    const file_path = join("upload", "product", product_uuid, image);
    if (!existsSync(file_path)) return res.end("file not exists");
    const file = createReadStream(file_path);
    file.pipe(res);
  }

  //route for get customer image
  @Get("customer/:image")
  async customer_image(
    @Param() { image }: any,
    @Res() res: Express_reponse_object
  ) {
    const file_path = join("upload", "customer", image);
    if (!existsSync(file_path)) return res.end("file not exists");
    const file = createReadStream(file_path);
    file.pipe(res);
  }
}

export default File_controller;

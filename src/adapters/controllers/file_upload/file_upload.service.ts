import { Injectable, Post } from "@nestjs/common";

@Injectable()
export class FileUploadService {
  @Post("log")
  pass() {
    return "pass";
  }
}

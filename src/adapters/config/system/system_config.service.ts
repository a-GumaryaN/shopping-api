import { Injectable } from "@nestjs/common";

@Injectable()
export class System_config {
  constructor(private jwt_secret = process.env.JWT_SECRET) {}

  get_jwt_secret() {
    return this.jwt_secret;
  }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class System_config_service {
  constructor(private configService: ConfigService) {}
  get_jwt_secret() {
    return this.configService.get<string>("JWT_SECRET");
  }
}

import { Injectable } from "@nestjs/common";
import { jwt_service, jwt_payload } from "src/domain/services/jwt.interface";
import { JwtService } from "@nestjs/jwt";
import { System_config_service } from "src/adapters/config/system/system_config.service";

@Injectable()
export class Jwt_token_service implements jwt_service {
  constructor(
    private readonly jwtService: JwtService,
    private system_config_service: System_config_service
  ) {}

  async check_token(token: string): Promise<any> {
    const secret = this.system_config_service.get_jwt_secret();
    return await this.jwtService.verifyAsync(token,{
      secret
    });
  }

  generate_token(payload: jwt_payload, expiresIn: string): string {
    const secret = this.system_config_service.get_jwt_secret();
    return this.jwtService.sign(payload, {
      secret,
    });
  }
}

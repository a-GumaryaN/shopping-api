import { Injectable } from '@nestjs/common';
import { jwt_service, jwt_payload } from 'src/domain/services/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Jwt_token_service implements jwt_service {
  constructor(private readonly jwtService: JwtService) {}

  async check_token(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  generate_token(payload: jwt_payload, expiresIn: string): string {
    const secret = process.env.SECRET;
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: expiresIn,
    });
  }
}

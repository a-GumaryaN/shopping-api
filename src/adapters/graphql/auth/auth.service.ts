import { Injectable } from '@nestjs/common';
import { login_schema } from 'src/domain/common/auth';

@Injectable()
export class Auth_service {
  async login_by_email(email: string, password: string): Promise<login_schema> {
    return await { token: 'token', user: null, error: null };
  }
}

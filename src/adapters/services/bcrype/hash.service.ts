import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { hash_service } from 'src/domain/services/hash_service';

@Injectable()
export class Hash_service implements hash_service {
  rounds: number = 10;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}

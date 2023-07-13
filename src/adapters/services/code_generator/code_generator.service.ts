import { Injectable } from '@nestjs/common';
import code_generator from 'src/domain/services/code_generator';

@Injectable()
export class Code_generator_service implements code_generator {
  generate = (length: number = 6) => {
    const code = Math.floor(Math.random() * 10 ** length).toString();
    return code;
  };
}

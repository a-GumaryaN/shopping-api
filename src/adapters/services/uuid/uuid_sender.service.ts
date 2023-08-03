import { Injectable } from '@nestjs/common';
import uuid_generator from 'src/domain/services/uuid_generator';
import {v4 as uuid} from "uuid"

@Injectable()
 class Uuid_generator_service implements uuid_generator {
  generate = () => {
    return uuid();
  };
}


export default Uuid_generator_service;
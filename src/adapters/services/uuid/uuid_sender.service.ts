import { Injectable } from '@nestjs/common';
import uuid_generator from 'src/domain/services/uuid_generator';

@Injectable()
 class Uuid_generator_service implements uuid_generator {
  generate = () => {
    //code for send validation code via sms service
    return "";
  };
}


export default Uuid_generator_service;
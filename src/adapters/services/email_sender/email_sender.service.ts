import { Injectable } from '@nestjs/common';
import { send_validation_code } from 'src/domain/services/code.sender';

@Injectable()
export class Email_sender_service implements send_validation_code {
  sender = async (getter: string, code: string) => {
    //code for send validation code via sms service
    return {};
  };
}

import { Module } from '@nestjs/common';
import { Sms_sender_service } from './sms_sender.service';

@Module({
  providers: [Sms_sender_service],
  exports: [Sms_sender_service],
})
class Sms_sender_module {}

export default Sms_sender_module;

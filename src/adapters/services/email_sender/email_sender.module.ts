import { Module } from '@nestjs/common';
import { Email_sender_service } from './email_sender.service';

@Module({
  providers: [Email_sender_service],
  exports:[Email_sender_service]
})
export class EmailSenderModule {}

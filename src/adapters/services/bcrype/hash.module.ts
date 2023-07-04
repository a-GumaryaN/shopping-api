import { Module } from '@nestjs/common';
import { Hash_service } from './hash.service';

@Module({
  providers: [Hash_service],
  exports: [Hash_service],
})
export class Hash_module {}

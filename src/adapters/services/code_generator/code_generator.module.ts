import { Module } from '@nestjs/common';
import { Code_generator_service } from './code_generator.service';

@Module({
  providers: [Code_generator_service],
  exports: [Code_generator_service],
})
class Code_generator_module {}

export default Code_generator_module;

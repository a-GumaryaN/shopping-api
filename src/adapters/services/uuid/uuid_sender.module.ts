import { Module } from '@nestjs/common';
import  Uuid_generator_service  from './uuid_sender.service';

@Module({
  providers: [Uuid_generator_service],
  exports:[Uuid_generator_service]
})
class Uuid_service_module {}


export default Uuid_service_module;

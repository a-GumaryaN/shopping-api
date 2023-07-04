import { Module } from '@nestjs/common';
import Auth_validator_service from './auth.service';

@Module({
  providers: [Auth_validator_service],
  exports: [Auth_validator_service],
})
class Auth_validator {}

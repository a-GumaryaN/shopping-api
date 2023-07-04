import { Module } from '@nestjs/common';
import Auth_resolver from './auth.resolver';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/usercase-proxy.module';

@Module({
  providers: [Auth_resolver],
  imports: [Usecase_proxy_module.register()],
})
export class Auth_module {}

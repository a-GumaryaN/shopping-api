import { Global, Module } from '@nestjs/common';
import { System_config } from './system_config.service';

@Global()
@Module({
    providers:[System_config]
})
export class JwtConfigModule {}

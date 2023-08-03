import { Global, Module } from '@nestjs/common';
import { System_config_service } from './system_config.service';

@Global()
@Module({
    providers:[System_config_service],
    exports:[System_config_service],
})
export class SystemonfigModule {}

import { Module } from '@nestjs/common';
import File_controller from './file.controller';
import File_service from './file.service';

@Module({
  providers: [File_service],
  controllers: [File_controller]
})
export class File_module {}

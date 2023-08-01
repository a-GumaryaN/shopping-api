import { Module } from '@nestjs/common';
import Temp_cleaner_service from './temp_cleaner.service';

@Module({
  providers: [Temp_cleaner_service],
  exports: [Temp_cleaner_service],
})
class Temp_cleanerM_module {}

export default Temp_cleanerM_module;
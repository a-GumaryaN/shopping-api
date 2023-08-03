import { Module } from '@nestjs/common';
import { Customer_seeder } from './customer.seeder';
import Repositories_module from '../repository/repositories.module';
import { CommandModule } from 'nestjs-command';
import Uuid_service_module from '../services/uuid/uuid_sender.module';
import Hash_module from '../services/bcrype/hash.module';
import { Product_seeder } from './product.seeder';

@Module({
    imports:[Repositories_module,Uuid_service_module,Hash_module,CommandModule],
    providers:[Customer_seeder,Product_seeder],
    exports:[Customer_seeder,Product_seeder],
})
export class SeedersModule {}

import { Module } from "@nestjs/common";
import { Hash_service } from "./hash.service";

@Module({
  providers: [Hash_service],
  exports: [Hash_service],
})
class Hash_module {}

export default Hash_module;

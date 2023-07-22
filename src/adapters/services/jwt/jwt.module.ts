import { Module } from "@nestjs/common";
import { JwtModule as Jwt } from "@nestjs/jwt";
import { Jwt_token_service } from "./jwt.service";

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "2d" },
    }),
  ],
  providers: [Jwt_token_service],
  exports: [Jwt_token_service],
})
class Jwt_module {}
export default Jwt_module;

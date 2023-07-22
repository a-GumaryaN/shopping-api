import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
class Jwt_auth_guard extends AuthGuard("jwt") {}

export default Jwt_auth_guard;

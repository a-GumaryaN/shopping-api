import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";

@Injectable()
class Rest_auth_guard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const req = context.switchToHttp().getRequest() as any;
    const user = req.user;

    return true;
  }
}

export default Rest_auth_guard;

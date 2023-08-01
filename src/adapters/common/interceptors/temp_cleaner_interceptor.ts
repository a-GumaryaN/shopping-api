import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import Temp_cleaner_service from "src/adapters/services/temp_cleaner/temp_cleaner.service";

@Injectable()
export class Temp_cleaner_interceptor implements NestInterceptor {
  constructor(private temp_cleaner_service: Temp_cleaner_service) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.temp_cleaner_service.clean_temp()));
  }
}

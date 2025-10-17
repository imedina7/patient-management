import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SignatureGuard implements CanActivate {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(SignatureGuard.name);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const expiration = request.params['expires'];
    const signature = request.query['signature'];
    this.logger.log({ expiration, signature });
    return true;
  }
}

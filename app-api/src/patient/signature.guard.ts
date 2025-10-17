import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class SignatureGuard implements CanActivate {
  private logger: Logger;
  constructor(private readonly cryptoService: CryptoService) {
    this.logger = new Logger(SignatureGuard.name);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const patientId = request.params['patientId'];
    const expiration = request.query['expires'];
    const signature = request.query['signature']?.toString();

    if (!expiration || !signature) return false;

    const payload = { url: `/patients/${patientId}/photo`, exp: expiration };

    return this.cryptoService.verify(JSON.stringify(payload), signature);
  }
}

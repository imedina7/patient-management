import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { ConfigKey } from 'src/config';

@Injectable()
export class CryptoService {
  private algorithm: string;
  private key: string;

  constructor(private readonly configService: ConfigService) {
    this.algorithm =
      this.configService.get<string>(ConfigKey.HMAC_CRYPTO_ALGORITHM) ??
      'sha256';
    this.key = this.configService.getOrThrow<string>(ConfigKey.HMAC_CRYPTO_KEY);
  }

  sign(message: string) {
    const hmac = createHmac(this.algorithm, this.key, { autoDestroy: true });
    return hmac.update(message).digest('hex');
  }

  verify(payload: string, hash: string) {
    const hmac = createHmac(this.algorithm, this.key, { autoDestroy: true });
    return hmac.update(payload).digest('hex') === hash;
  }
}

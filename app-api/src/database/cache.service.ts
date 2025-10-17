import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Valkey from 'iovalkey';
import { ConfigKey } from 'src/config';

const DEFAULT_TTL = 60 * 60 * 12;

@Injectable()
export class CacheService {
  private client: Valkey;

  private static initialized = false;

  private readonly logger: Logger = new Logger(CacheService.name);

  constructor(readonly configService: ConfigService) {
    this.client = new Valkey({
      host: this.configService.get(ConfigKey.VALKEY_HOST),
      port: this.configService.get(ConfigKey.VALKEY_PORT),
      keyPrefix: 'cache:',
      password: this.configService.get(ConfigKey.VALKEY_API_KEY),
    });

    if (this.client && !CacheService.initialized) {
      this.logger.log('Valkey client created');
      this.getServerAttribute('redis_version')
        .then((version) => {
          this.logger.log(`Redis version: ${version}`);
        })
        .catch((error) => {
          this.logger.error(error.message, error.stack, error.cause);
        });
      CacheService.initialized = true;
    }
  }

  get(key: string) {
    return this.client.get(key);
  }

  async set(
    key: string,
    value: string,
    TTL: number = DEFAULT_TTL,
  ): Promise<'OK'> {
    const result = await this.client.set(key, value);

    if (result === 'OK') {
      await this.client.expire(key, TTL);
    }
    return 'OK';
  }

  invalidate(key: string) {
    return this.client.del(key);
  }

  async getServerAttribute(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.info((err, result) => {
        if (err) {
          reject(err);
        }
        const output = result
          ?.split('\n')
          .find((row) => row.includes(`${key}:`))
          ?.split(':')[1]!;
        resolve(output);
      });
    });
  }
}

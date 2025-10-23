import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Valkey from 'iovalkey';
import { ConfigKey } from 'src/config';

const DEFAULT_TTL = 60 * 60 * 12;

@Injectable()
export class CacheService {
  private static client: Valkey;

  private readonly logger: Logger = new Logger(CacheService.name);

  constructor(readonly configService: ConfigService) {
    if (CacheService.client) return;

    CacheService.client = new Valkey({
      host: this.configService.get(ConfigKey.VALKEY_HOST),
      port: this.configService.get(ConfigKey.VALKEY_PORT),
      keyPrefix: 'cache:',
      password: this.configService.get(ConfigKey.VALKEY_API_KEY),
      connectTimeout:
        this.configService.get(ConfigKey.VALKEY_CONNECT_TIMEOUT) ?? 5000,
      maxRetriesPerRequest: 10,
    });

    this.logger.log('Service Initialized!');
    this.getServerAttribute('redis_version')
      .then((version) => {
        this.logger.log(`Redis server version: ${version}`);
      })
      .catch((error) => {
        this.logger.error(error.message, error.stack, error.cause);
      });
  }

  get(key: string) {
    return CacheService.client.get(key);
  }

  async set(
    key: string,
    value: string,
    TTL: number = DEFAULT_TTL,
  ): Promise<'OK'> {
    const result = await CacheService.client.set(key, value);

    if (result === 'OK') {
      await CacheService.client.expire(key, TTL);
    }
    return 'OK';
  }

  invalidate(key: string) {
    return CacheService.client.del(key);
  }

  async getServerAttribute(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      CacheService.client.info((err, result) => {
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

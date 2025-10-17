import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { CacheModule } from './cache.module';
import { CacheService } from './cache.service';
import config from '../../mikro-orm.config';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  providers: [CacheService],
  imports: [
    CacheModule,
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        clientUrl: configService.get<string>(ConfigKey.DATABASE_URL),
        autoLoadEntities: true,
        driver: PostgreSqlDriver,
        entities: ['./dist/src/database/entities'],
        entitiesTs: ['./src/database/entities'],
      }),
      inject: [ConfigService],
      driver: PostgreSqlDriver,
    }),
  ],
  exports: [CacheModule],
})
export class DatabaseModule {}

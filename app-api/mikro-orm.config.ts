import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import * as entities from './src/database/entities';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: Object.values(entities),
  clientUrl: process.env.DATABASE_URL,
  highlighter: new SqlHighlighter(),
  debug: true,
  baseDir: './src/database/',
  logger: (message: string) => logger.log(message),
  seeder: {
    path: './seeders',
    pathTs: './seeders',
    defaultSeeder: 'DatabaseSeeder',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  extensions: [SeedManager, Migrator],
});

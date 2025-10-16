import { EntityManager, Dictionary } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './DatabaseSeeder';

export class PatientSeeder extends Seeder {
  run(
    em: EntityManager,
    context?: SeederContext | undefined,
  ): void | Promise<void> {}
}

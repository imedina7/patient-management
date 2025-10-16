import { Dictionary, EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Patient } from '../entities';
import { PatientSeeder } from './PatientSeeder';

export interface SeederContext extends Dictionary {
  patients: Patient[];
}

export class DatabaseSeeder extends Seeder {
  private context: SeederContext = {
    patients: [],
  };

  async run(em: EntityManager) {
    await this.call(em, [PatientSeeder]);
  }

  async call(em: EntityManager, seeders: (new () => Seeder<Dictionary>)[]) {
    for (const seeder of seeders) {
      await new seeder().run(em, this.context);
    }
  }
}

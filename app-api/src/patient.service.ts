import { Cursor, EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Patient } from './database/entities';

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type PatientSort = keyof Patient;

@Injectable()
export class PatientService {
  constructor(private readonly entityManager: EntityManager) {}
  findById(id: string): Promise<Patient> {
    const patient = this.entityManager.findOneOrFail(Patient, { id });
    return patient;
  }

  findAll(
    sortBy: PatientSort,
    sortDir: SortDirection,
    after: string,
  ): Promise<Cursor<Patient>> {
    return this.entityManager.findByCursor(
      Patient,
      {},
      {
        after,
        orderBy: { [sortBy]: sortDir },
      },
    );
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
  ): Promise<Patient> {
    const patient = this.entityManager.create(Patient, {
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    await this.entityManager.flush();
    return patient;
  }

  delete(id: string) {
    return this.entityManager.nativeDelete(Patient, { id });
  }
}

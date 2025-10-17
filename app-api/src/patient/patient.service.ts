import { Cursor, EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Patient } from '../database/entities';
import { CryptoService } from 'src/crypto/crypto.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationTransport } from 'src/notification/notification.enum';
import { FilesystemStorageService } from 'src/storage/storage.service';

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type PatientSort = keyof Patient;

@Injectable()
export class PatientService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly notificationService: NotificationService,
  ) {}
  findById(id: string): Promise<Patient> {
    const patient = this.entityManager.findOneOrFail(Patient, { id });
    return patient;
  }

  findAll(
    after?: string,
    sortBy: PatientSort = 'lastName',
    sortDir: SortDirection = SortDirection.Asc,
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
      notificationConfig: {
        [NotificationTransport.EMAIL]: true,
      },
    });
    await this.entityManager.flush();
    await this.notificationService.notify({
      configs: [
        {
          type: NotificationTransport.EMAIL,
          message: {
            body: 'You have been registered successfully',
            title: 'Welcome!',
          },
          to: patient.email,
        },
      ],
    });
    return patient;
  }

  delete(id: string) {
    return this.entityManager.nativeDelete(Patient, { id });
  }
}

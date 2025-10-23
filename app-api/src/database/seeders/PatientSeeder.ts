import { EntityManager, Dictionary } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './DatabaseSeeder';
import { Patient } from '../entities';
import { NotificationTransport } from '../../notification/notification.enum';

const patients = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+15555155555',
    notificationConfig: {
      [NotificationTransport.EMAIL]: true,
    },
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    phoneNumber: '+15555155555',
    notificationConfig: {
      [NotificationTransport.EMAIL]: true,
    },
  },
];

export class PatientSeeder extends Seeder {
  async run(
    em: EntityManager,
    context?: SeederContext | undefined,
  ): Promise<void> {
    for (const {
      firstName,
      lastName,
      email,
      phoneNumber,
      notificationConfig,
    } of patients) {
      em.create(Patient, {
        firstName,
        lastName,
        email,
        phoneNumber,
        notificationConfig,
      });
    }
  }
}

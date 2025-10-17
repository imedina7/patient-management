import { NotificationTransport } from 'src/notification/notification.enum';
import { BaseEntity } from './base-entity';
import { Entity, Property } from '@mikro-orm/postgresql';

@Entity({ tableName: 'patients' })
export class Patient extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  phoneNumber: string;

  @Property({ type: 'json', default: '{ "EMAIL": true }' })
  notificationConfig: Record<NotificationTransport, boolean>;
}

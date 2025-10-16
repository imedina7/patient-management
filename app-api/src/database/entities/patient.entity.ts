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
}

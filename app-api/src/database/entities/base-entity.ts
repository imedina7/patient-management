import { Opt, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { v7 as uuid } from 'uuid';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();

  constructor() {
    this.id = uuid();
  }
}

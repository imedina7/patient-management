import { Migration } from '@mikro-orm/migrations';

export class Migration20251015221438 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "patients" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, constraint "patients_pkey" primary key ("id"));`);
  }

}

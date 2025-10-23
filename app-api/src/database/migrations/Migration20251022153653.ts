import { Migration } from '@mikro-orm/migrations';

export class Migration20251022153653 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "patients" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "notification_config" jsonb not null default '{ "EMAIL": true }', constraint "patients_pkey" primary key ("id"));`);
  }

}

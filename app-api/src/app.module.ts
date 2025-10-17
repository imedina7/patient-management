import { Module } from '@nestjs/common';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CryptoService } from './crypto/crypto.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule,
    StorageModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [PatientController],
  providers: [PatientService, CryptoService],
})
export class AppModule {}

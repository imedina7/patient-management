import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { EmailService } from '../notification/email.service';
import { FilesystemStorageService } from 'src/storage/storage.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, EmailService, FilesystemStorageService],
})
export class PatientModule {}

import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, EmailService],
})
export class PatientModule {}

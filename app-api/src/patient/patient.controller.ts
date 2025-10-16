import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService, PatientSort, SortDirection } from './patient.service';
import { EmailService } from 'src/email/email.service';

interface RegisterPatientDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  findPatients(
    @Query('sortBy') sortBy: PatientSort,
    @Query('sortDir') sortDir: SortDirection,
    @Query('after') after: string,
  ) {
    return this.patientService.findAll(sortBy, sortDir, after);
  }

  @Post()
  async registerPatient(
    @Body(new ValidationPipe())
    { firstName, lastName, email, phoneNumber }: RegisterPatientDTO,
  ) {
    const patient = await this.patientService.register(
      firstName,
      lastName,
      email,
      phoneNumber,
    );

    await this.emailService.sendMail(
      patient.email,
      'Welcome!',
      'You have been registered successfully',
    );
    return patient;
  }

  @Delete(':id')
  deletePatient(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}

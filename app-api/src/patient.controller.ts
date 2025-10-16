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

interface RegisterPatientDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findPatients(
    @Query('sortBy') sortBy: PatientSort,
    @Query('sortDir') sortDir: SortDirection,
    @Query('after') after: string,
  ) {
    return this.patientService.findAll(sortBy, sortDir, after);
  }

  @Post()
  registerPatient(
    @Body(new ValidationPipe())
    { firstName, lastName, email, phoneNumber }: RegisterPatientDTO,
  ) {
    return this.patientService.register(
      firstName,
      lastName,
      email,
      phoneNumber,
    );
  }

  @Delete(':id')
  deletePatient(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}

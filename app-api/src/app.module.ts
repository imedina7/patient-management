import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}

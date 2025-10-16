import { Module } from '@nestjs/common';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    EmailModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}

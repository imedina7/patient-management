import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  InternalServerErrorException,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService, PatientSort, SortDirection } from './patient.service';
import { EmailService } from '../notification/email.service';
import { RegisterPatientDTO } from './patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CryptoService } from '../crypto/crypto.service';
import { SignatureGuard } from './signature.guard';
import { FilesystemStorageService } from 'src/storage/storage.service';
import { createReadStream } from 'fs';
import { Response } from 'express';

type PatientItemDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  id: string;
  updatedAt: string;
  createdAt: string;
};

type CursorDTO<T> = {
  items: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalCount: number;
};

@Controller('patients')
export class PatientController {
  private logger: Logger;
  constructor(
    private readonly patientService: PatientService,
    private readonly cryptoService: CryptoService,
    private readonly storage: FilesystemStorageService,
  ) {
    this.logger = new Logger(PatientController.name);
  }

  @Get()
  async findPatients(
    @Query('sortBy') sortBy: PatientSort,
    @Query('sortDir') sortDir: SortDirection,
    @Query('after') after: string,
  ): Promise<CursorDTO<PatientItemDTO>> {
    const cursor = await this.patientService.findAll(after, sortBy, sortDir);
    return {
      ...cursor,
      items: cursor.items.map((patient) => {
        const photoUrl = `/patients/${patient.id}/photo`;
        const expiration = new Date(Date.now() + 12 * 60 * 60).toISOString();
        const payload = {
          url: photoUrl,
          exp: expiration,
        };
        const signedUrl = this.cryptoService.sign(JSON.stringify(payload));
        return {
          ...patient,
          createdAt: patient.createdAt.toISOString(),
          updatedAt: patient.updatedAt.toISOString(),
          photoUrl: `${photoUrl}?sigature=${signedUrl}&expires=${expiration}`,
        };
      }),
    };
  }

  @Get('/:patientId/photo')
  @UseGuards(SignatureGuard)
  async getPatientPhoto(
    @Param('patientId', new ParseUUIDPipe()) patientId: string,
    @Res() response: Response,
  ) {
    const photo = await this.storage.readObject(`/${patientId}.jpg`);
    response.type('jpeg');
    return response.send(photo);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async registerPatient(
    @Body()
    { firstName, lastName, email, phoneNumber }: RegisterPatientDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const patient = await this.patientService.register(
        firstName,
        lastName,
        email,
        phoneNumber,
      );

      await this.storage.saveObject(`/${patient.id}.jpg`, file.buffer);

      this.logger.log(`File "${file.originalname}" was uploaded
        Type: ${file.mimetype}`);
      return patient;
    } catch (err) {
      this.logger.error('Failed to save file', err);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  deletePatient(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}

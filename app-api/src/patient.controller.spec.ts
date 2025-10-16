import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

const base = {
  id: '0199e52e-b7ed-743a-a2ce-31e801119f9f',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const patientOnee = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@example.com',
  phoneNumber: '+15555555555',
};

jest.mock('uuid');

describe('AppController', () => {
  let appController: PatientController;
  let patientService: PatientService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService],
    }).compile();

    appController = app.get<PatientController>(PatientController);
    patientService = await app.resolve<PatientService>(PatientService);
  });

  describe('PatientController', () => {
    it('should register a patient and return their info', async () => {
      jest
        .spyOn(patientService, 'register')
        .mockImplementation(
          (
            firstName: string,
            lastName: string,
            email: string,
            phoneNumber: string,
          ) =>
            new Promise((resolve) =>
              resolve({ firstName, lastName, email, phoneNumber, ...base }),
            ),
        );

      expect(await appController.registerPatient(patientOnee)).toMatchObject({
        ...patientOnee,
        ...base,
      });
    });
  });
});

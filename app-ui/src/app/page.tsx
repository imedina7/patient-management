import { getPatients } from "@/actions/patients";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";

type PatientItemDTO = {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
};

export default async function PatientsPage() {
  const patients = await getPatients();
  return (
    <main className="mt-3">
      <div className="px-5 py-2">
        <Link href="/newpatient">
          <Button>Register Patient</Button>
        </Link>
        <p>
          Here you can see a list of the currently registered patients, click on
          their names to see more info
        </p>
      </div>
      <div className="grid grid-cols-6 gap-3 px-5 py-2">
        {patients.items.map((patient: PatientItemDTO) => (
          <Card
            className=""
            key={
              patient.email +
              "-" +
              patient.firstName +
              patient.phoneNumber +
              Math.random()
            }
          >
            <CardHeader>
              {patient.lastName}, {patient.firstName}
              <Image
                alt={patient.firstName}
                src={`${process.env.API_BASE_URL}${patient.photoUrl}`}
                width={200}
                height={100}
              ></Image>
            </CardHeader>
            <CardBody>
              <div>Email:</div>
              <div>{patient.email}</div>
              <div>Phone number:</div>
              <div>{patient.phoneNumber}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}

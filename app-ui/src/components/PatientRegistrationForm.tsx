"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "./Input";
import { Button } from "./Button";
import { FormEvent, useActionState } from "react";
import { registerPatient } from "@/actions/patients";
import { FileDropArea } from "./FileDropArea";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCode: "",
  phoneNumber: "",
};
export function PatientRegistrationForm() {
  const [state, formAction] = useActionState(registerPatient, INITIAL_STATE);
  return (
    <form action={formAction}>
      <h2>Patient Registration Form</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Label className="LabelRoot" htmlFor="firstName">
              First name
            </Label>
            <Input type="text" id="firstName" name="firstName" required />
          </div>
          <div className="flex flex-col">
            <Label className="LabelRoot" htmlFor="lastName">
              Last name
            </Label>
            <Input type="text" id="lastName" name="lastName" />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="LabelRoot" htmlFor="email">
            Email Address
          </Label>
          <Input type="text" id="email" name="email" required />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              id="phoneCode"
              name="phoneCode"
              className="w-12"
              required
            />
            <Input
              type="text"
              id="phoneNumber"
              className="w-full"
              name="phoneNumber"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="LabelRoot" htmlFor="email">
            Upload a picture of your ID card
          </Label>
          <Input type="file" accept="image/jpeg" name="file"></Input>
          {/* <FileDropArea
            type="file"
            name="file"
            id="documentPicture"
            accept="image/jpeg"
            required
          /> */}
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
}

"use server";

export async function registerPatient(
  {
    firstName,
    lastName,
    email,
    phoneCode,
    phoneNumber,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
  },
  formData: FormData
) {
  const response = await fetch(`${process.env.API_BASE_URL}/patients`, {
    method: "POST",
    body: formData,
  });
  const responseData = await response.json();
  console.log(responseData);
  return {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
    phoneCode: formData.get("phoneCode")?.toString() ?? "",
  };
}
export async function getPatients() {
  try {
    const data = await fetch(`${process.env.API_BASE_URL!}/patients`);
    return await data.json();
  } catch (err) {
    console.error(err);
    return { items: [] };
  }
}

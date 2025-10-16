import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@radix-ui/react-label";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <nav></nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action="">
          <Card>
            <h2>Patient Registration Form</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <Label className="LabelRoot" htmlFor="firstName">
                  Full name
                </Label>
                <Input type="text" id="firstName" />
              </div>
              <div className="flex flex-col">
                <Label className="LabelRoot" htmlFor="email">
                  Email Address
                </Label>
                <Input type="text" id="email" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex gap-2">
                  <Input type="text" id="phone" className="w-12" />
                  <Input type="text" id="phone" className="w-full" />
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="LabelRoot" htmlFor="email">
                  Upload a picture of your ID card
                </Label>
                <Input type="file" id="documentPicture" accept="image/jpeg" />
              </div>
              <div>
                <Button>Submit</Button>
              </div>
            </div>
          </Card>
        </form>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}

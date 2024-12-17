/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNewInvoice() {
  return (
    <main className="flex flex-col my-12 max-w-5xl mx-auto gap-3 justify-center">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoice</h1>
      </div>
      <form className="grid gap-4 max-w-xs py-5">
        {/* name */}
        <div>
          <Label htmlFor="name" className="block mb-2 font-semibold">
            Billing Name
          </Label>
          <Input id="name" name="name" type="text" />
        </div>
        {/* email */}
        <div>
          <Label htmlFor="email" className="block mb-2 font-semibold">
            Billing Email
          </Label>
          <Input id="email" name="email" type="text" />
        </div>
        {/* value */}
        <div>
          <Label htmlFor="value" className="block mb-2 font-semibold">
            Value
          </Label>
          <Input id="value" name="value" type="text" />
        </div>
        {/* description */}
        <div>
          <Label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </Label>
          <Textarea id="description" name="description" />
        </div>
        <div>
          <Button className="w-full font-semibold py-5 my-5">Submit</Button>
        </div>
      </form>
    </main>
  );
}

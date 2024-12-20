/** @format */
"use client";

import { createAction } from "@/app/actions";
import SubmitButton from "@/app/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";
import Form from "next/form";

export default function CreateNewInvoice() {
  const [state, setState] = useState("ready");

  async function handleSubmit(event: SyntheticEvent) {
    if (state === "pending") {
      event.preventDefault();
      return;
    }
    setState("pending");
  }

  return (
    <main className="flex flex-col my-12 max-w-5xl mx-auto gap-3 justify-center">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoice</h1>
      </div>
      <Form
        className="grid gap-4 max-w-xs py-5"
        action={createAction}
        onSubmit={handleSubmit}
      >
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
          <SubmitButton />
        </div>
      </Form>
    </main>
  );
}

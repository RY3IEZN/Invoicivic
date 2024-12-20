/** @format */

"use server";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  "use server";
  const value = Math.floor(parseFloat(String(formData.get("value"))));
  const description = formData.get("description") as string;

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}
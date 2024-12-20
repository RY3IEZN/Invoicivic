/** @format */
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice Id");
  }

  const [results] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!results) {
    notFound();
  }

  return (
    <main className="my-12 max-w-5xl mx-auto gap-3">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl flex items-center gap-4 font-bold">
          Invoice #{invoiceId}
          <Badge
            className={cn(
              "rounded-full capitalize",
              results.status === "open" && "bg-blue-500",
              results.status === "paid" && "bg-green-600",
              results.status === "void" && "bg-zinc-700",
              results.status === "uncollectible" && "bg-red-600"
            )}
          >
            {results.status}
          </Badge>
        </h1>
        <p></p>
      </div>
      <p className="text-3xl mb-3">${results.value.toFixed(2)}</p>
      <p className="text-lg mb-8">{results.description}</p>
      <h2 className="font-bold text-lg mb-4">Billing Details</h2>
      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
            Invoice ID
          </strong>
          <span>{invoiceId}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
            Invoice Date
          </strong>
          <span>{new Date(results.createTs).toLocaleDateString("en-GB")}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
            Billing Name
          </strong>
          <span></span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
            Billing Email
          </strong>
          <span></span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-semibold text-sm"></strong>
          <span></span>
        </li>
      </ul>
    </main>
  );
}

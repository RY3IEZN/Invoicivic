/** @format */
import Container from "@/app/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { CircleCheck, CreditCard } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice Id");
  }

  const [results] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      createTs: Invoices.createTs,
      description: Invoices.description,
      value: Invoices.value,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!results) {
    notFound();
  }

  const invoice = {
    ...results,
    customer: {
      name: results.name,
    },
  };

  return (
    <main className="w-full h-full my-12  gap-3">
      <Container>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-between mb-5">
              <h1 className="text-3xl flex items-center gap-4 font-bold">
                Invoice #{invoiceId}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "paid" && "bg-green-600",
                    invoice.status === "void" && "bg-zinc-700",
                    invoice.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </h1>
              <p></p>
            </div>
            <p className="text-3xl mb-3">${invoice.value.toFixed(2)}</p>
            <p className="text-lg mb-8">{invoice.description}</p>
          </div>
          <div>
            <h2 className="text-lg mb-4">Manage Invoice</h2>
            {invoice.status === "open" && (
              <form>
                <Button className="flex gap-2 bg-green-700 font-bold">
                  Pay Invoice <CreditCard className="w-5 h-auto" />
                </Button>
              </form>
            )}

            {invoice.status === "paid" && (
              <p className="text-xl font-bold flex gap-2 items-center">
                <CircleCheck className="bg-green-700 rounded-full text-white" />
                Invoice Paid
              </p>
            )}
          </div>
        </div>
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
            <span>
              {new Date(invoice.createTs).toLocaleDateString("en-GB")}
            </span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-semibold text-sm"></strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}

/** @format */
import Container from "@/app/components/Container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteInvoiceAction, updateStatusAction } from "@/app/actions";
import { AVAILABLE_STATUS } from "@/constants/data";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId } = await auth();
  const invoiceId = parseInt((await params).invoiceId);

  if (!userId) return;

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice Id");
  }

  const [results] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!results) {
    notFound();
  }

  const invoice = {
    ...results.invoices,
    customer: results.customer,
  };

  return (
    <main className="w-full h-full my-12  gap-3">
      <Container>
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
          <p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="font-semibold">
                  Change Status <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUS.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <input type="hidden" name="status" value={status.id} />
                        <Button variant={"ghost"}>{status.label}</Button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            {/*  */}
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="font-semibold">
                    <span className="sr-only">More Options</span>
                    <Ellipsis className="w-4 h-auto size-18" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <Button variant={"ghost"}>
                        {" "}
                        <Trash2 />
                        Delete Invoice
                      </Button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form action={deleteInvoiceAction}>
                      <input type="hidden" name="id" value={invoiceId} />
                      <Button variant={"destructive"}>
                        <Trash2 />
                        Delete
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </p>
        </div>
        <p className="text-3xl mb-3">${invoice.value.toFixed(2)}</p>
        <p className="text-lg mb-8">{invoice.description}</p>
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
            <strong className="block w-28 flex-shrink-0 font-semibold text-sm">
              Billing Email
            </strong>
            <span>{invoice.customer.email}</span>
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

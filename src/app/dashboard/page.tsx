/** @format */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import Container from "../components/Container";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";

export default async function Dashboard() {
  const { userId, orgId } = await auth();

  if (!userId) return;

  let results;

  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId)));
  }

  const invoices = results.map(({ invoices, customer }) => {
    return {
      ...invoices,
      customer: customer,
    };
  });

  return (
    <main className="h-full gap-6">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p>
            <Button asChild>
              <Link href={"/invoices/new"}>
                <CirclePlus />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((results) => {
              return (
                <TableRow key={results.id}>
                  <TableCell className="font-medium text-left p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block font-semibold"
                    >
                      {new Date(results.createTs).toLocaleDateString("en-GB")}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block font-semibold"
                    >
                      {results.customer.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" text-left p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block"
                    >
                      {results.customer.email}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block"
                    >
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
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block font-semibold"
                    >
                      ${results.value.toFixed(2)}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}

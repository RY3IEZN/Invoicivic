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
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import Container from "../components/Container";

export default async function Dashboard() {
  const results = await db.select().from(Invoices);

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
            {results.map((results) => {
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
                      Uneku E.
                    </Link>
                  </TableCell>
                  <TableCell className=" text-left p-0">
                    <Link
                      href={`/invoices/${results.id}`}
                      className="p-4 block"
                    >
                      unekue3@gmail.com
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

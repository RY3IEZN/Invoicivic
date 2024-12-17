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
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="flex flex-col my-12 max-w-5xl mx-auto gap-3 justify-center text-center">
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
          <TableRow>
            <TableCell className="p-4  font-medium text-left ">
              <span>10/21/24</span>
            </TableCell>
            <TableCell className="p-4 text-left">
              <span>Uneku E.</span>
            </TableCell>
            <TableCell className="p-4 text-left">
              <span>unekue3@gmail.com</span>
            </TableCell>
            <TableCell className="p-4 text-center">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="p-4 text-right">
              <span>$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}

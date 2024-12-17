/** @format */

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center max-w-5xl mx-auto gap-3 justify-center h-screen text-center">
      <h1 className="text-5xl font-bold">Invoicyn</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign in</Link>
        </Button>
      </p>
    </main>
  );
}

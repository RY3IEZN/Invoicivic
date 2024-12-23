/** @format */

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col items-center max-w-5xl mx-auto gap-3 justify-center text-center">
      <h1 className="text-5xl font-bold">Invoicivic</h1>
      <p>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </p>
    </main>
  );
}

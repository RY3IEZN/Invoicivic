/** @format */

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex justify-between gap-4 mt-5 mb-3">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href={"/dashboard"}>Invoicivic</Link>
            </p>
            <span className="text-slate-500">/</span>
            <SignedIn>
              <OrganizationSwitcher afterCreateOrganizationUrl={"/dashboard"} />
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

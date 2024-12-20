/** @format */

import Container from "@/app/components/Container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <SignIn />;
    </Container>
  );
}

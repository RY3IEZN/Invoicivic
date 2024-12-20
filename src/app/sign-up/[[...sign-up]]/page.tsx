/** @format */

import Container from "@/app/components/Container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <SignUp />;
    </Container>
  );
}

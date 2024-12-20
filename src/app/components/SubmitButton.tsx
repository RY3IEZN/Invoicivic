/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <Button className="w-full relative font-semibold py-5 my-5">
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <span className="flex items-center justify-center w-full h-full absolute">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
};

export default SubmitButton;

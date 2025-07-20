import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account to get started",
};

export default function SignUpPage() {
  return (
    <>
      <SignUpForm className="mb-4" />
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </>
  );
}

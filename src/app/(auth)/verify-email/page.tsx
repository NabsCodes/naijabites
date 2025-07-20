import Link from "next/link";
import { EmailVerificationForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your Naijabites account email",
};

export default function VerifyEmailPage() {
  return (
    <>
      <EmailVerificationForm className="mb-4" />
      <div className="text-balance text-center text-xs text-muted-foreground">
        Already verified?{" "}
        <Link
          href="/login"
          className="font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-green-dark/80"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}

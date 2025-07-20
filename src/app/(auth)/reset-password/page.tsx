import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set your new Naijabites account password",
};

export default function ResetPasswordPage() {
  return (
    <>
      <ResetPasswordForm className="mb-4" />
      <div className="text-balance text-center text-xs text-muted-foreground">
        Remember your password?{" "}
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

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailVerificationSchema,
  type EmailVerificationFormData,
} from "@/lib/validations/auth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

type VerificationStatus = "pending" | "success" | "error" | "expired";

export function EmailVerificationForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("pending");

  const onSubmit = async (data: EmailVerificationFormData) => {
    setIsLoading(true);

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      // Randomly simulate different states for demo
      const statuses: VerificationStatus[] = ["success", "error", "expired"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      setVerificationStatus(randomStatus);
      console.log("Email verification submitted", data);
    }, 2000);
  };

  const handleResend = async () => {
    setIsResending(true);

    // Simulate resend process
    setTimeout(() => {
      setIsResending(false);
      setVerificationStatus("pending");
      console.log("Resend verification email");
    }, 1500);
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "success":
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-dark/10">
              <CheckCircleIcon className="h-8 w-8 text-green-dark" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-green-dark">
                Email verified!
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                Your email has been successfully verified. You can now access
                your Naijabites account.
              </p>
            </div>

            <Button
              asChild
              className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90"
            >
              <Link href="/login">Sign in to your account</Link>
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircleIcon className="h-8 w-8 text-red-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-red-600">
                Verification failed
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                The verification link is invalid or has expired. Please try
                again or request a new verification email.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResend}
                disabled={isResending}
                className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:opacity-50"
              >
                {isResending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Resend verification email"
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-10 border-green-dark/20 bg-white text-green-dark transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/5"
              >
                <Link href="/login">Back to sign in</Link>
              </Button>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <XCircleIcon className="h-8 w-8 text-orange-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-orange-600">
                Link expired
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                The verification link has expired. Please request a new
                verification email to continue.
              </p>
            </div>

            <Button
              onClick={handleResend}
              disabled={isResending}
              className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:opacity-50"
            >
              {isResending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send new verification email"
              )}
            </Button>
          </div>
        );

      default:
        return (
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-green-dark">
                Verify your email
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                Enter your email address to verify your account
              </p>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-green-dark"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={cn(
                    "h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                    errors.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify email"
                )}
              </Button>
            </div>

            <div className="text-center text-xs">
              <p className="mb-2 text-muted-foreground">
                Didn't receive the verification email?
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleResend}
                disabled={isResending}
                className="h-10 border-green-dark/20 bg-white text-green-dark transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/5"
              >
                {isResending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Resend verification email"
                )}
              </Button>
            </div>
          </form>
        );
    }
  };

  return (
    <Card
      className={cn(
        "rounded-3xl bg-white/80 p-6 shadow-none md:p-8",
        className,
      )}
      {...props}
    >
      {renderContent()}
    </Card>
  );
}

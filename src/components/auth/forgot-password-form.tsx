"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { AuthContainer } from "./auth-container";
import { useToast } from "@/hooks/use-toast";

export function ForgotPasswordForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: emailFromQuery },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast({
          variant: "error",
          title: "Failed to send reset link",
          description:
            result.error || "Something went wrong. Please try again.",
        });
        return;
      }

      if (!result.success && !result.message) {
        console.error("🔴 Invalid API response: missing success indicator");
        toast({
          variant: "error",
          title: "Failed to send reset link",
          description: "Server returned invalid response. Please try again.",
        });
        return;
      }

      toast({
        variant: "success",
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });

      // Reset form and show success state
      reset();
      setIsSubmitted(true);
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      toast({
        variant: "error",
        title: "Something went wrong",
        description:
          "Please try again or contact support if the issue persists.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <AuthContainer className={className} {...props}>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-dark/10">
            <EnvelopeIcon className="h-8 w-8 text-green-dark" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-dark">
              Check your email
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              We've sent a password reset link to your email. Please check your
              inbox and follow the instructions.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="h-10 border-green-dark/20 bg-white text-green-dark transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/5"
            >
              Try again
            </Button>
          </div>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer className={className} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-green-dark">
            Forgot your password?
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password
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
                "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                errors.email &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
              )}
              disabled={isSubmitting}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              aria-required="true"
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-describedby={isSubmitting ? "forgot-loading" : undefined}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span id="forgot-loading">Sending reset link...</span>
              </div>
            ) : (
              "Send reset link"
            )}
          </Button>
        </div>
      </form>
    </AuthContainer>
  );
}

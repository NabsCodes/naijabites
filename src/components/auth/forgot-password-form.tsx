"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { AuthContainer } from "./auth-container";

export function ForgotPasswordForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Forgot password form submitted", data);
    }, 2000);
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
              onClick={() => setIsSubmitted(false)}
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
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Sending reset link...
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

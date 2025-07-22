"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card } from "../ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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

  const [error, setError] = useState('');

const onSubmit = async (data: ForgotPasswordFormData) => {
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Something went wrong');
      return;
    }

    setIsSubmitted(true);
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    setError('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  if (isSubmitted) {
    return (
      <Card
        className={cn(
          "rounded-3xl bg-white/80 p-6 shadow-none md:p-8",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-dark/10">
            <EnvelopeIcon className="h-8 w-8 text-green-dark" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-dark">
              Check your email
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
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
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "rounded-3xl bg-white/80 p-6 shadow-none md:p-8",
        className,
      )}
      {...props}
    >
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
                "h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                errors.email &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

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

        <div className="text-center text-xs">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-green-dark/80"
          >
            <ArrowLeftIcon className="h-3 w-3" />
            Back to sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}

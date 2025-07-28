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
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
  { label: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "One number", test: (pwd) => /\d/.test(pwd) },
];

export function ResetPasswordForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Reset password form submitted", data);
    }, 2000);
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
            <CheckCircleIcon className="h-8 w-8 text-green-dark" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-dark">
              Password updated!
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>
          </div>

          <Button
            asChild
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90"
          >
            <Link href="/login">Sign in to your account</Link>
          </Button>
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
            Set new password
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-green-dark"
            >
              New password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                {...register("password")}
                className={cn(
                  "h-12 border-green-dark/20 pr-12 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                  errors.password &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-green-dark"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-green-dark"
            >
              Confirm new password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
                className={cn(
                  "h-12 border-green-dark/20 pr-12 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                  errors.confirmPassword &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-green-dark"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-green-dark">
                Password requirements:
              </p>
              <div className="space-y-1">
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.test(password);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs"
                    >
                      {isMet ? (
                        <CheckCircleIcon className="h-3 w-3 text-green-600" />
                      ) : (
                        <XCircleIcon className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={isMet ? "text-green-600" : "text-gray-500"}
                      >
                        {requirement.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Updating password...
              </div>
            ) : (
              "Update password"
            )}
          </Button>
        </div>

        <div className="text-center text-xs">
          <Link
            href="/login"
            className="font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-green-dark/80"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}

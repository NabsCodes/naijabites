"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export function SignUpForm({ className, ...props }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch("password");

  // Password requirements for checklist
  const passwordRequirements = [
    {
      label: "At least 8 characters",
      test: (pwd: string) => pwd && pwd.length >= 8,
    },
    {
      label: "One uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd || ""),
    },
    {
      label: "One lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd || ""),
    },
    {
      label: "One number",
      test: (pwd: string) => /\d/.test(pwd || ""),
    },
  ];

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register form submitted:", data);
    }, 2000);
  };

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
            Sign up for Naijabites
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Create your account to start shopping authentic Nigerian groceries
          </p>
        </div>

        <div className="grid gap-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-green-dark"
              >
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                className={cn(
                  "h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                  errors.firstName &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-green-dark"
              >
                Last name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={cn(
                  "h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                  errors.lastName &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-green-dark"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password")}
                className={cn(
                  "h-12 border-green-dark/20 pr-12 transition-colors focus:border-green-dark focus:ring-green-dark/20",
                  errors.password &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
            {/* Password requirements checklist */}
            {password && (
              <div className="mt-2 space-y-2">
                <p className="text-xs font-medium text-green-dark">
                  Password requirements:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {passwordRequirements.map((requirement, idx) => {
                    const isMet = requirement.test(password);
                    return (
                      <div
                        key={idx}
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
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Creating account...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>

          <div className="relative text-center text-sm">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-dark/20"></div>
            </div>
            <span className="relative bg-white px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled
            className="h-12 w-full border-green-dark/20 bg-white text-green-dark transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/5"
          >
            <FaGoogle className="mr-2" size={18} />
            Continue with Google
          </Button>
        </div>

        <div className="text-center text-xs">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-green-dark/80"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}

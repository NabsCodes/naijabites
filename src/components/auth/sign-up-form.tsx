"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { AuthContainer } from "@/components/auth/auth-container";
import { cn } from "@/lib/utils";

export function SignUpForm({ className, ...props }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "complete">("email");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger, // TODO: Remove trigger when using real APIs - this is just for demo loading state
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

  const handleEmailSubmit = async (emailData: { email: string }) => {
    setIsLoading(true);

    // Simulate email validation
    setTimeout(() => {
      setIsLoading(false);
      setEmail(emailData.email);
      setValue("email", emailData.email);
      setStep("complete");
    }, 1000);
  };

  const handleBackToEmail = () => {
    setStep("email");
    // Keep the email value so user doesn't lose it
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register form submitted:", data);
    }, 2000);
  };

  // Step 1: Email only
  if (step === "email") {
    return (
      <AuthContainer className={className} {...props}>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const emailValue = formData.get("email") as string;

            // TODO: Remove this manual validation when using real APIs
            // This is just for demo to show loading state even with validation errors
            trigger("email").then((isValid) => {
              if (isValid) {
                handleEmailSubmit({ email: emailValue });
              }
            });

            // Use the following when using real APIs
            // handleEmailSubmit({ email: emailValue });
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold text-green-dark">
              Create your account
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email to get started with Naijabites
            </p>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="signup-email"
                className="text-sm font-medium text-green-dark"
              >
                Email address
              </Label>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                defaultValue={email}
                placeholder="Enter your email"
                className={cn(
                  "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                  errors.email &&
                    "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                )}
                {...register("email")}
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
                  Checking email...
                </div>
              ) : (
                "Continue"
              )}
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
      </AuthContainer>
    );
  }

  // Step 2: Complete profile
  return (
    <AuthContainer className={className} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-2xl font-bold text-green-dark">
            Complete your profile
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Almost done! Just a few more details to create your account
          </p>
          <div className="flex items-center gap-2 rounded-2xl bg-green-dark/5 px-3 py-2 text-xs font-medium text-green-dark">
            <EnvelopeIcon className="h-4 w-4" />
            <span>{email}</span>
          </div>
        </div>

        <div className="grid gap-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                autoComplete="given-name"
                {...register("firstName")}
                className={cn(
                  "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                  errors.firstName &&
                    "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
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
                autoComplete="family-name"
                {...register("lastName")}
                className={cn(
                  "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                  errors.lastName &&
                    "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                )}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label
              htmlFor="signup-password"
              className="text-sm font-medium text-green-dark"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password"
                {...register("password")}
                className={cn(
                  "h-12 border-green-dark/20 pr-12 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                  errors.password &&
                    "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
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
          </div>
          {/* Password requirements checklist */}
          {password && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-green-dark">
                Password requirements:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {passwordRequirements.map((requirement, idx) => {
                  const isMet = requirement.test(password);
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
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
                Creating account...
              </div>
            ) : (
              "Create account"
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

        {/* Back to email button */}
        {email && (
          <div className="text-center text-xs">
            <button
              type="button"
              onClick={handleBackToEmail}
              className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-green-dark"
            >
              ← Back to email
            </button>
          </div>
        )}
      </form>
    </AuthContainer>
  );
}

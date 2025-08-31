"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import config from "../../../config.json";
import { saveLogin, fetchCustomerData } from "@/lib/auth";
import { useAuthActions } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm({ className, ...props }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [step, setStep] = useState<"email" | "details">("email");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuthActions();

  const otpCodeLength = config.otp.code_length;
  const otpCooldown = config.otp.cooldown_expiry;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    reset,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch("password");
  const email = watch("email");

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
    { label: "One number", test: (pwd: string) => /\d/.test(pwd || "") },
  ];

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const interval = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleSendOtp = async () => {
    if (!email) {
      toast({
        variant: "error",
        title: "Email required",
        description: "Please enter a valid email address first.",
      });
      return;
    }

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast({
          variant: "error",
          title: "Failed to send code",
          description:
            result.error ||
            "Unable to send verification code. Please try again.",
        });
        return;
      }

      setOtpCountdown(otpCooldown);

      // Simple success message
      toast({
        variant: "success",
        title: "Verification code sent",
        description: `Check your email for a ${otpCodeLength}-digit code`,
      });
    } catch (err) {
      console.error("❌ OTP Error:", err);
      toast({
        variant: "error",
        title: "Connection error",
        description: "Please check your internet connection and try again.",
      });
    }
  };

  const handleContinue = async () => {
    const valid = await trigger("email");
    if (!valid) return;

    setIsTransitioning(true);

    try {
      await handleSendOtp();
      setTimeout(() => {
        setStep("details");
        setIsTransitioning(false);
      }, 800);
    } catch (err) {
      console.error("❌ OTP Error:", err);
      setIsTransitioning(false);
      toast({
        variant: "error",
        title: "Unable to continue",
        description:
          "Something went wrong while sending your verification code. Please try again.",
      });
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Clear OTP field immediately after form validation passes
      setValue("otp", "");
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        toast({
          variant: "error",
          title: "Signup failed",
          description:
            result.error || "Unable to create your account. Please try again.",
        });
        return;
      }

      if (!result.accessToken) {
        console.error("🔴 Invalid API response: missing access token");
        toast({
          variant: "error",
          title: "Signup failed",
          description: "Server returned invalid response. Please try again.",
        });
        return;
      }

      console.log("🟢 Signup success: Access Token:", result.accessToken);
      saveLogin(result.accessToken);

      const customerData = await fetchCustomerData();

      // Update Zustand store so header updates immediately
      if (customerData) {
        login(customerData);
      }

      // Reset form immediately
      reset();

      toast({
        variant: "success",
        title: "Account created!",
        description: "Welcome to Naijabites! Redirecting you to the home page.",
      });

      // Delay redirect to let user see success message
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error("❌ Signup error:", err);
      toast({
        variant: "error",
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <AuthContainer
      className={cn(
        "rounded-3xl bg-white/80 p-6 shadow-none md:p-8",
        className,
      )}
      {...props}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-green-dark">
            Create your Naijabites account
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Start with your email, then confirm your details to finish signup
          </p>
          {email && step === "details" && (
            <div className="flex items-center gap-2 rounded-2xl bg-green-dark/5 px-3 py-2 text-xs font-medium text-green-dark">
              <EnvelopeIcon className="h-4 w-4" />
              <span>{email}</span>
            </div>
          )}
        </div>

        {isTransitioning && (
          <div className="flex flex-col items-center justify-center space-y-4 py-2">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-dark/20 border-t-green-dark"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <EnvelopeIcon className="h-5 w-5 text-green-dark" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-green-dark">
                Sending verification code...
              </p>
              <p className="text-xs text-muted-foreground">
                Please wait while we process your request
              </p>
            </div>
          </div>
        )}

        {!isTransitioning && (
          <div className="grid gap-5">
            {step === "email" && (
              <>
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
                    disabled={isSubmitting}
                    className={cn(
                      "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                      errors.email &&
                        "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting || isTransitioning}
                  className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </Button>
              </>
            )}

            {step === "details" && (
              <>
                <div className="grid gap-2">
                  <Label
                    htmlFor="otp"
                    className="text-sm font-medium text-green-dark"
                  >
                    Verification code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="otp"
                      type="text"
                      placeholder={`Enter ${otpCodeLength}-digit code`}
                      maxLength={otpCodeLength}
                      {...register("otp")}
                      disabled={isSubmitting}
                      className={cn(
                        "h-12 flex-1 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                        errors.otp &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                      )}
                      aria-describedby={errors.otp ? "otp-error" : undefined}
                      aria-invalid={!!errors.otp}
                      aria-required="true"
                    />
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpCountdown > 0 || !email || isSubmitting}
                      className={cn(
                        "h-12 w-1/4 transition-all duration-300 disabled:cursor-not-allowed",
                        otpCountdown > 0
                          ? "border border-gray-200 bg-gray-100 text-gray-500"
                          : "bg-green-dark font-medium text-white hover:bg-green-dark/90 active:scale-95",
                      )}
                    >
                      {otpCountdown > 0
                        ? `Resend in ${otpCountdown}s`
                        : "Send code"}
                    </Button>
                  </div>
                  {errors.otp && (
                    <p
                      id="otp-error"
                      className="text-xs text-red-500"
                      role="alert"
                    >
                      {errors.otp.message}
                    </p>
                  )}
                </div>

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
                      disabled={isSubmitting}
                      className={cn(
                        "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                        errors.firstName &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                      )}
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                      aria-invalid={!!errors.firstName}
                      aria-required="true"
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
                        "h-12 border-green-dark/20 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                        errors.lastName &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                      )}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-green-dark"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      {...register("password")}
                      className={cn(
                        "h-12 border-green-dark/20 pr-12 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                        errors.password &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                      )}
                      disabled={isSubmitting}
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
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {password && (
                  <div className="mt-2 space-y-2">
                    <p className="text-xs font-medium text-green-dark">
                      Password requirements:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {passwordRequirements.map((req, idx) => {
                        const isMet = req.test(password);
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
                              className={
                                isMet ? "text-green-600" : "text-gray-500"
                              }
                            >
                              {req.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>

                <div className="flex items-center justify-center text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-green-dark"
                  >
                    ← Back to email
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="text-center text-xs">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="font-medium text-green-dark underline underline-offset-4 hover:text-green-dark/80"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { AuthContainer } from "@/components/auth";
import { saveLogin, fetchCustomerData } from "@/lib/auth";
import { useAuthActions } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({ className, ...props }: { className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError: setFormError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const emailValue = watch("email");
  const { toast } = useToast();
  const { login } = useAuthActions();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("🟡 Login response:", res);
      const result = await res.json();

      if (!res.ok) {
        console.error("🔴 Login failed:", result.error);
        setFormError("password", {
          type: "manual",
          message: "Invalid email or password",
        });

        toast({
          variant: "error",
          title: "Login failed",
          description:
            result.error || "Invalid email or password. Please try again.",
        });
        return;
      }

      if (!result.accessToken) {
        console.error("🔴 Invalid API response: missing access token");
        toast({
          variant: "error",
          title: "Login failed",
          description: "Server returned invalid response. Please try again.",
        });
        return;
      }

      console.log("🟢 Login successful:", result);

      // Save token in cookies using auth.ts
      saveLogin(result.accessToken);

      // Fetch and save customer data
      const customerData = await fetchCustomerData();

      // Update Zustand store so header updates immediately
      if (customerData) {
        login(customerData);
      }

      toast({
        variant: "success",
        title: "Welcome back!",
        description: "Successfully signed in to your account.",
      });

      // Reset form and redirect
      reset();
      router.push("/");
    } catch (err) {
      console.error("🔴 Unexpected error:", err);

      toast({
        variant: "error",
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <AuthContainer className={className} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-green-dark">Welcome back!</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Sign in to your Naijabites account to continue shopping
          </p>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label
              htmlFor="login-email"
              className="text-sm font-medium text-green-dark"
            >
              Email address
            </Label>
            <Input
              id="login-email"
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

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="login-password"
                className="text-sm font-medium text-green-dark"
              >
                Password
              </Label>
              <Link
                href={`/forgot-password${emailValue ? `?email=${encodeURIComponent(emailValue)}` : ""}`}
                className="text-sm text-green-dark underline-offset-4 transition-colors hover:text-green-dark/80 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={cn(
                  "h-12 border-green-dark/20 pr-12 transition-colors focus-visible:border-green-dark focus-visible:ring-green-dark/20",
                  errors.password &&
                    "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                )}
                disabled={isSubmitting}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                aria-invalid={!!errors.password}
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-green-dark"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="text-xs text-red-500"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-describedby={isSubmitting ? "login-loading" : undefined}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span id="login-loading">Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <div className="text-center text-xs">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-green-dark/80"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
}

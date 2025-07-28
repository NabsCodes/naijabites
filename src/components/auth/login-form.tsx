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
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginForm({ className, ...props }: { className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login form submitted", data);
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
          <h1 className="text-2xl font-bold text-green-dark">Welcome back!</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Sign in to your Naijabites account to continue shopping
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

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-green-dark"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-green-dark underline-offset-4 transition-colors hover:text-green-dark/80 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
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
            className="h-12 w-full border-green-dark/20 bg-white text-green-dark transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/5"
          >
            <FaGoogle className="mr-3" size={18} />
            Continue with Google
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
    </Card>
  );
}

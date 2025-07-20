"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { Card } from "../ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export function SignUpForm({ className, ...props }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    // Simulate registration process
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
                {...register("firstName", { required: true })}
                className="h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20"
              />
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
                {...register("lastName", { required: true })}
                className="h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20"
              />
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
              {...register("email", { required: true })}
              className="h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20"
            />
          </div>

          {/* Phone Field */}
          {/* <div className="grid gap-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-green-dark"
            >
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone", { required: true })}
              className="h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20"
            />
          </div> */}

          {/* Password Fields */}
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
                {...register("password", { required: true })}
                className="h-12 border-green-dark/20 pr-12 transition-colors focus:border-green-dark focus:ring-green-dark/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-green-dark"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
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

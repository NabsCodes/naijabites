"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { Card } from "../ui/card";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import config from '../../../config.json';

export function SignUpForm({ className, ...props }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const otpCodeLength = config.otp.code_length;
  const otpCooldown = config.otp.cooldown_expiry;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch("password");
  const email = watch("email");

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pwd: string) => pwd && pwd.length >= 8 },
    { label: "One uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd || "") },
    { label: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd || "") },
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
      setError("Please enter a valid email before requesting OTP.");
      return;
    }
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to send OTP');

      setOtpSent(true);
      setOtpCountdown(otpCooldown); // from config
    } catch (err) {
      console.error("❌ OTP Error:", err);
      setError("Failed to send OTP");
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Something went wrong');
        return;
      }
      console.log('🟢 Signup success: Access Token:', result.accessToken);
      setSuccess(true);
    } catch (err) {
      console.error('❌ Signup error:', err);
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("rounded-3xl bg-white/80 p-6 shadow-none md:p-8", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-green-dark">Sign up for Naijabites</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Create your account to start shopping authentic Nigerian groceries
          </p>
        </div>

        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" type="text" placeholder="John" {...register("firstName")} />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" type="text" placeholder="Doe" {...register("lastName")} />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="name@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* OTP Section */}
          <div className="grid gap-2">
            <Label htmlFor="otp">OTP Code</Label>
            <div className="flex gap-2">
              <Input 
                id="otp" 
                type="text" 
                placeholder={`Enter ${otpCodeLength}-digit OTP`} 
                className="flex-1"
                maxLength={otpCodeLength}
                {...register("otp")} 
              />
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={otpCountdown > 0 || !email}
                className="h-10 w-1/4 bg-green-dark text-white disabled:opacity-50"
              >
                {otpCountdown > 0 ? `${otpCountdown}s` : "Get OTP"}
              </Button>
            </div>
            {errors.otp && <p className="text-xs text-red-500">{errors.otp.message}</p>}
            {otpSent && otpCountdown > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                OTP sent to <span className="font-medium">{email}</span>
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {password && (
            <div className="mt-2 space-y-2">
              <p className="text-xs font-medium text-green-dark">Password requirements:</p>
              <div className="grid grid-cols-2 gap-2">
                {passwordRequirements.map((req, idx) => {
                  const isMet = req.test(password);
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {isMet ? <CheckCircleIcon className="h-3 w-3 text-green-600" /> : <XCircleIcon className="h-3 w-3 text-gray-400" />}
                      <span className={isMet ? "text-green-600" : "text-gray-500"}>{req.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {error && <div className="text-sm text-red-500 -mt-2">{error}</div>}
          {success && <div className="text-sm text-green-600 -mt-2">✅ Account created successfully!</div>}

          <Button type="submit" disabled={isLoading} className="h-12 w-full bg-green-dark text-white">
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
            <span className="relative bg-white px-4 text-muted-foreground">Or continue with</span>
          </div>

          <Button type="button" variant="outline" className="h-12 w-full border-green-dark/20 text-green-dark">
            <FaGoogle className="mr-2" size={18} /> Continue with Google
          </Button>
        </div>

        <div className="text-center text-xs">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="font-medium text-green-dark underline underline-offset-4 hover:text-green-dark/80">
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}

import React from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/icons/logo-icon";
import { AuthMarquee } from "@/components/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo Header */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <LogoIcon width={180} height={50} className="text-green-dark" />
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>

      {/* Right side - Marquee */}
      <div className="hidden lg:block">
        <AuthMarquee className="pr-6" />
      </div>
    </div>
  );
}

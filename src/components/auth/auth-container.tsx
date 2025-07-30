"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export function AuthContainer({
  children,
  className,
  ...props
}: AuthContainerProps) {
  return (
    <>
      {/* Mobile: No card wrapper */}
      <div className={cn("md:hidden", className)} {...props}>
        {children}
      </div>

      {/* Tablet and up: Card wrapper with styling */}
      <Card
        className={cn(
          "hidden rounded-3xl bg-white/80 p-6 shadow-none md:block md:p-8",
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    </>
  );
}

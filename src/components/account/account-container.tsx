"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AccountContainerProps {
  children: ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export function AccountContainer({
  children,
  className,
  ...props
}: AccountContainerProps) {
  return (
    <>
      {/* Mobile: No card wrapper */}
      <div className={cn("sm:hidden", className)} {...props}>
        {children}
      </div>

      {/* Tablet and up: Card wrapper with styling */}
      <Card className={cn("hidden shadow-none sm:block", className)} {...props}>
        {children}
      </Card>
    </>
  );
}

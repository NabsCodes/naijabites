"use client";

import { useRef } from "react";

interface DevSuspendProps {
  delayMs?: number;
  children: React.ReactNode;
}

// Forces a Suspense fallback in development for a brief period.
// No-op in production.
export function DevSuspend({ delayMs = 1500, children }: DevSuspendProps) {
  const isDev = process.env.NODE_ENV === "development";
  const promiseRef = useRef<Promise<void> | null>(null);
  const doneRef = useRef<boolean>(false);

  if (!isDev) {
    return <>{children}</>;
  }

  if (!doneRef.current) {
    if (!promiseRef.current) {
      promiseRef.current = new Promise<void>((resolve) => {
        setTimeout(() => {
          doneRef.current = true;
          resolve();
        }, delayMs);
      });
    }
    throw promiseRef.current;
  }

  return <>{children}</>;
}

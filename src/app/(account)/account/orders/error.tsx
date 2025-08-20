"use client";

import { ErrorSection } from "@/components/common";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorSection
      error={error}
      reset={reset}
      title="Orders"
      description="We're having trouble fetching your order history. This is usually a temporary issue that resolves quickly."
    />
  );
}

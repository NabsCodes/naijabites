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
      title="Order Details"
      description="We're having trouble fetching this order's details. This is usually a temporary issue that resolves quickly."
      actionText="Back to Orders"
      actionHref="/account/orders"
    />
  );
}

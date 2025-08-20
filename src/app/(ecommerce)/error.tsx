"use client";

import { useEffect } from "react";
import { ErrorSection } from "@/components/common";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ecommerce page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md">
        <ErrorSection
          error={error}
          reset={reset}
          title="Page"
          description="We encountered an unexpected error while loading this page. Please try refreshing the page or contact support if the problem persists."
          actionText="Go to Homepage"
          actionHref="/"
        />

        {/* Development Error Details */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details (Development)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs text-red-600">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

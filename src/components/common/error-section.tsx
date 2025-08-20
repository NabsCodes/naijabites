"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface ErrorSectionProps {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export function ErrorSection({
  error,
  reset,
  title = "Content",
  description,
  actionText,
  actionHref,
}: ErrorSectionProps) {
  const getDefaultDescription = () => {
    if (error?.message) {
      return error.message;
    }

    return `We're having trouble loading ${title.toLowerCase()}. This is usually a temporary issue that resolves quickly.`;
  };

  const displayDescription = description || getDefaultDescription();

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 text-center sm:gap-6 sm:py-8">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 sm:h-20 sm:w-20">
        <ExclamationTriangleIcon className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 sm:max-w-md">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Unable to Load {title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
          {displayDescription}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3">
        {reset && (
          <Button
            onClick={reset}
            className="w-full bg-green-dark font-medium text-white shadow-sm transition-colors duration-300 hover:bg-green-dark/90 sm:w-auto"
          >
            <ArrowPathIcon className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}

        {actionText && actionHref && (
          <Button
            asChild
            variant="outline"
            className="w-full border-green-dark text-green-dark transition-colors duration-300 hover:border-green-dark hover:bg-green-dark/10 hover:text-green-dark sm:w-auto"
          >
            <Link
              href={actionHref}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {actionText}
            </Link>
          </Button>
        )}
      </div>

      {/* Support Link */}
      <div className="flex items-center gap-1 text-sm text-gray-400">
        <span className="text-sm text-gray-500">Need help?</span>
        <Link
          href="/contact"
          className="text-sm text-green-dark transition-colors duration-300 hover:text-green-dark/90 hover:underline"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DocumentDuplicateIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  value: string;
  ariaLabel?: string;
  className?: string;
}

export function CopyButton({
  value,
  ariaLabel = "Copy to clipboard",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        title: "Copied",
        description: "Order number copied to clipboard.",
        variant: "success",
      });
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "error",
      });
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={ariaLabel}
      className={className}
      onClick={handleCopy}
    >
      {copied ? (
        <CheckCircleIcon className="h-4 w-4 text-green-dark" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

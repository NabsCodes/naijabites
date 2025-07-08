import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: {
      button: "h-8 w-8",
      input: "h-8 w-12 text-sm",
      icon: "h-3 w-3",
    },
    md: {
      button: "h-10 w-10 sm:h-12 sm:w-12",
      input: "h-10 w-14 sm:h-12 sm:w-16 text-sm sm:text-base",
      icon: "h-4 w-4",
    },
    lg: {
      button: "h-12 w-12",
      input: "h-12 w-16 text-base",
      icon: "h-5 w-5",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn("flex w-fit items-center", className)}>
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={cn(
          "flex items-center justify-center rounded-l-xl border-2 border-r-0 border-gray-300 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
          classes.button,
        )}
      >
        <Minus className={classes.icon} />
      </button>
      <div
        className={cn(
          "flex items-center justify-center border-2 border-x-0 border-gray-300 bg-white font-semibold",
          classes.input,
        )}
      >
        {quantity}
      </div>
      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={cn(
          "flex items-center justify-center rounded-r-xl border-2 border-l-0 border-gray-300 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
          classes.button,
        )}
      >
        <Plus className={classes.icon} />
      </button>
    </div>
  );
}

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
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
      button: "h-7 w-7",
      input: "min-w-[2rem] px-2 text-xs",
      icon: "h-3 w-3",
      container: "gap-1 p-0.5",
    },
    md: {
      button: "h-8 w-8 sm:h-9 sm:w-9",
      input: "min-w-[2.5rem] px-3 text-sm sm:min-w-[3rem]",
      icon: "h-3.5 w-3.5 sm:h-4 sm:w-4",
      container: "gap-1 p-1 sm:gap-1.5 sm:p-1.5",
    },
    lg: {
      button: "h-10 w-10",
      input: "min-w-[3.5rem] px-4 text-base",
      icon: "h-4 w-4",
      container: "gap-2 p-1.5",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-gray-300 bg-gray-50 shadow-sm",
        classes.container,
        className,
      )}
    >
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={cn(
          "flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-sm",
          classes.button,
        )}
      >
        <MinusIcon className={classes.icon} strokeWidth={2} />
      </button>
      <div
        className={cn(
          "flex items-center justify-center font-semibold tabular-nums text-gray-900",
          classes.input,
        )}
      >
        {quantity}
      </div>
      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={cn(
          "flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-sm",
          classes.button,
        )}
      >
        <PlusIcon className={classes.icon} strokeWidth={2} />
      </button>
    </div>
  );
}

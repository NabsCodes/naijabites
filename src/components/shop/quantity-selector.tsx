"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "card";
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
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input value when quantity prop changes
  useEffect(() => {
    if (!isEditing) {
      setInputValue(quantity.toString());
    }
  }, [quantity, isEditing]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const numValue = parseInt(inputValue, 10);

    if (isNaN(numValue) || numValue < min) {
      onQuantityChange(min);
    } else if (numValue > max) {
      onQuantityChange(max);
    } else {
      onQuantityChange(numValue);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setInputValue(quantity.toString());
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  const handleInputFocus = () => {
    setIsEditing(true);
    inputRef.current?.select();
  };

  const sizeClasses = {
    sm: {
      button: "h-7 w-7",
      input: "min-w-[2rem] px-2 text-xs",
      icon: "h-3 w-3",
      container: "gap-1 p-0.5",
    },
    md: {
      button: "h-8 w-8",
      input: "min-w-[2.5rem] px-3 text-sm",
      icon: "h-3.5 w-3.5",
      container: "gap-1 p-1",
    },
    lg: {
      button: "h-10 w-10",
      input: "min-w-[3.5rem] px-4 text-base",
      icon: "h-4 w-4",
      container: "gap-2 p-1.5",
    },
    card: {
      button: "h-7 w-7",
      input: "min-w-[2.5rem] px-3 text-sm",
      icon: "h-4 w-4",
      container: "gap-1.5 p-0.5",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-full border border-green-dark bg-gray-50 shadow-sm",
        classes.container,
        className,
      )}
    >
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={cn(
          "flex items-center justify-center rounded-full border border-gray-300 bg-green-dark text-white shadow-sm transition-all duration-200 hover:bg-green-dark/80 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm",
          classes.button,
        )}
      >
        <MinusIcon className={classes.icon} strokeWidth={2} />
      </button>

      <input
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-full border-0 bg-transparent text-center font-semibold tabular-nums text-gray-900 transition-colors [appearance:textfield] hover:border-2 hover:border-gray-300 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-dark/20 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          classes.input,
        )}
        aria-label={`Quantity: ${quantity}`}
      />

      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={cn(
          "flex items-center justify-center rounded-full border border-gray-300 bg-green-dark text-white shadow-sm transition-all duration-200 hover:bg-green-dark/80 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm",
          classes.button,
        )}
      >
        <PlusIcon className={classes.icon} strokeWidth={2} />
      </button>
    </div>
  );
}

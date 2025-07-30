import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn(
          "peer h-12 border-green-dark/20 transition-colors focus:border-green-dark focus:ring-green-dark/20",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-sm font-medium text-green-dark duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
};

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, error, rightIcon, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <FloatingInput
          ref={ref}
          id={id}
          className={cn(
            rightIcon && "pr-12",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Centralized price formatting utility
interface FormatPriceOptions {
  currency?: "NGN" | "CAD" | "USD";
  locale?: string;
  minimumFractionDigits?: number;
}

const CURRENCY_CONFIG = {
  NGN: { locale: "en-NG", currency: "NGN", minimumFractionDigits: 0 },
  CAD: { locale: "en-CA", currency: "CAD", minimumFractionDigits: 2 },
  USD: { locale: "en-US", currency: "USD", minimumFractionDigits: 2 },
} as const;

// Default app currency - easily configurable
const DEFAULT_CURRENCY = "NGN" as const;

export function formatPrice(
  price: number,
  options: FormatPriceOptions = {},
): string {
  const validPrice = Math.max(price || 0, 0);
  const currency = options.currency || DEFAULT_CURRENCY;
  const config = CURRENCY_CONFIG[currency];

  return new Intl.NumberFormat(options.locale || config.locale, {
    style: "currency",
    currency: options.currency || config.currency,
    minimumFractionDigits:
      options.minimumFractionDigits ?? config.minimumFractionDigits,
  }).format(validPrice);
}

// Convenience functions for specific currencies
export const formatNGN = (price: number) =>
  formatPrice(price, { currency: "NGN" });
export const formatCAD = (price: number) =>
  formatPrice(price, { currency: "CAD" });
export const formatUSD = (price: number) =>
  formatPrice(price, { currency: "USD" });

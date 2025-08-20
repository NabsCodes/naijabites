import type { RangeFilter } from "@/types/order";

export function isWithinRange(dateIso: string, range: RangeFilter): boolean {
  if (range === "all") return true;
  const now = new Date();
  const date = new Date(dateIso);
  const msInDay = 1000 * 60 * 60 * 24;
  switch (range) {
    case "30d":
      return now.getTime() - date.getTime() <= 30 * msInDay;
    case "3m":
      return now.getTime() - date.getTime() <= 90 * msInDay;
    case "6m":
      return now.getTime() - date.getTime() <= 180 * msInDay;
    case "1y":
      return now.getTime() - date.getTime() <= 365 * msInDay;
    default:
      return true;
  }
}

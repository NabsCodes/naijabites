import { LucideIcon, Users } from "lucide-react";

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon | string;
}

export const stats: Stat[] = [
  { label: "Happy Customers", value: "15,000+", icon: Users },
  { label: "Products Available", value: "2,500+", icon: "📦" },
  { label: "Cities Served", value: "50+", icon: "🏙️" },
  { label: "Years of Service", value: "5+", icon: "⏰" },
];

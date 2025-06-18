import { LucideIcon, Truck, Shield, Clock } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free delivery on orders over $75. Same-day delivery available in select cities.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "All products are carefully selected and checked for freshness and authenticity.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help with any questions or concerns.",
  },
];

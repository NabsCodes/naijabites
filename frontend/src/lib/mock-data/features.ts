import { LucideIcon, Truck, Shield, Clock } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Offering {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
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

export const offeringsCarousel: Offering[] = [
  {
    id: 1,
    title: "Authentic Products",
    description:
      "We source only from trusted Nigerian brands, ensuring the same great taste and quality you know.",
    image: "/images/woman-farmer.webp",
    alt: "Smiling Nigerian woman farmer holding fresh leafy vegetables in a green field",
  },
  {
    id: 2,
    title: "Fast & Reliable Delivery",
    description:
      "Get your favorite Nigerian products delivered fresh to your door across Canada within 24-48 hours.",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=1000&auto=format&fit=crop",
    alt: "Professional delivery person with packages ensuring fast and reliable service",
  },
  {
    id: 3,
    title: "Competitive Pricing",
    description:
      "Enjoy the best prices on authentic Nigerian products with regular discounts and bulk purchase options.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    alt: "Shopping cart filled with fresh groceries showing affordable pricing and value",
  },
  {
    id: 4,
    title: "Community-Driven",
    description:
      "Built by Nigerians, for Nigerians. We understand your needs and bring the taste of home to Canada.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    alt: "Diverse group of people celebrating together, representing Nigerian community in Canada",
  },
];

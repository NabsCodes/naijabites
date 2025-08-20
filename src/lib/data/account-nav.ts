import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export interface AccountNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export const accountNavItems: AccountNavItem[] = [
  {
    href: "/account/profile",
    label: "Profile",
    icon: UserIcon,
    description: "Manage your personal information",
  },
  {
    href: "/account/orders",
    label: "Orders",
    icon: ShoppingBagIcon,
    description: "View your order history",
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    icon: MapPinIcon,
    description: "Manage your delivery addresses",
  },
  {
    href: "/account/wishlist",
    label: "Wishlist",
    icon: HeartIcon,
    description: "Your saved items",
  },
  {
    href: "/account/security",
    label: "Security",
    icon: LockClosedIcon,
    description: "Password and account security",
  },
];

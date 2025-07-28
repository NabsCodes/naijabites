import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon, ShopIcon, AboutIcon, ContactIcon } from "@/components/icons";

// Navigation items data - shared between header and mobile nav
export const navigationItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: ShopIcon },
  { href: "/about", label: "About Us", icon: AboutIcon },
  { href: "/contact", label: "Contact Us", icon: ContactIcon },
];

// Account menu items data - shared between header and mobile nav
export const accountMenuItems = [
  { icon: UserIcon, label: "My Profile", href: "/account/profile" },
  { icon: ShoppingBagIcon, label: "My Orders", href: "/account/orders" },
  { icon: MapPinIcon, label: "My Addresses", href: "/account/addresses" },
  { icon: HeartIcon, label: "Wishlist", href: "/account/wishlist" },
];

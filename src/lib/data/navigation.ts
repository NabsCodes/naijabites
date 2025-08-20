import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
  HomeIcon,
  StarIcon,
  FireIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconCustom,
  ShopIcon,
  AboutIcon,
  ContactIcon,
} from "@/components/icons";

// Enhanced navigation items with shop dropdown
export const navigationItems = [
  { href: "/", label: "Home", icon: HomeIconCustom },
  {
    href: "/shop",
    label: "Shop",
    icon: ShopIcon,
    hasDropdown: true,
    dropdownItems: [
      {
        href: "/shop",
        label: "Shop Home",
        description: "Featured collections & deals",
        icon: HomeIcon,
      },
      {
        href: "/shop/products",
        label: "All Products",
        description: "Browse our complete catalog",
        icon: CubeIcon,
      },
      {
        href: "/shop/deals",
        label: "Deals",
        description: "Special offers & discounts",
        icon: FireIcon,
      },
      {
        href: "/shop/recommended",
        label: "Recommended",
        description: "Personalized picks for you",
        icon: StarIcon,
      },
    ],
  },
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

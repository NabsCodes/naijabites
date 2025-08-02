import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

// Footer navigation sections
export const footerNavigation = {
  explore: {
    title: "Explore",
    links: [
      { href: "/shop", label: "Shop Products" },
      { href: "/about", label: "About Us" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { href: "/account/profile", label: "Profile" },
      { href: "/account/orders", label: "Order History" },
      { href: "/cart", label: "Shopping Cart" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "#", label: "Return Policy" },
      { href: "#", label: "Terms & Conditions" },
    ],
  },
};

// Social media links
export const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "#",
    label: "Twitter",
    icon: FaXTwitter,
  },
  {
    href: "#",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
];

// Footer navigation sections as array for easier mapping
export const footerSections = [
  footerNavigation.explore,
  footerNavigation.account,
  footerNavigation.support,
];

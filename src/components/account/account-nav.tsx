"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AccountNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const accountNavItems: AccountNavItem[] = [
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

export function AccountNav() {
  const pathname = usePathname();

  const handleSignOut = () => {
    // TODO: Implement sign out functionality
    console.log("Sign out clicked");
  };

  return (
    <div className="space-y-6">
      {/* Navigation Menu */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <nav className="space-y-1 p-3">
            {accountNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200",
                    isActive
                      ? "bg-[#E6F2ED] text-green-dark"
                      : "text-gray-700 hover:bg-[#E6F2ED] hover:text-green-dark",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-green-dark" : "text-gray-500",
                    )}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div
                      className={cn(
                        "text-xs",
                        isActive ? "text-green-dark" : "text-gray-500",
                      )}
                    >
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}

            <Separator className="my-2" />

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 transition-all duration-200 hover:bg-red-50"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium">Sign Out</div>
                <div className="text-xs text-red-400">
                  Sign out of your account
                </div>
              </div>
            </button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}

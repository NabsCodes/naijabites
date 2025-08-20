"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNavItems } from "@/lib/data/account-nav";
import { cn } from "@/lib/utils";

export function AccountNavTabsMobile() {
  const pathname = usePathname();

  return (
    <div className="relative -mx-2 mb-4 lg:hidden">
      {/* Left fade indicator */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-9 bg-gradient-to-r from-gray-50 to-transparent sm:hidden" />
      {/* Right fade indicator */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-9 bg-gradient-to-l from-gray-50 to-transparent sm:hidden" />
      {/* Scrollable navigation */}
      <nav
        aria-label="Account sections"
        className="scrollbar-hide overflow-x-auto pb-2"
      >
        <ul className="flex min-w-full gap-2 px-2">
          {accountNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-2 text-sm",
                    "transition-colors",
                    isActive
                      ? "border-green-dark bg-green-dark/10 text-green-dark"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-dark/40 hover:text-green-dark",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-green-dark" : "text-gray-500",
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

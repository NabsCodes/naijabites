"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { headerCategories } from "@/lib/mock-data/categories";

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <div className="mx-auto">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container-padding">
          <div className="section-container">
            <div className="flex items-center gap-8 pt-6">
              {headerCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-green-dark",
                    pathname === category.href ||
                      pathname.startsWith(category.href)
                      ? "text-green-dark"
                      : "text-gray-700",
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Horizontal Scroll */}
      <div className="block lg:hidden">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-4 px-4 pt-3">
            {headerCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={cn(
                  "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  pathname === category.href ||
                    pathname.startsWith(category.href)
                    ? "bg-green-dark text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100",
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

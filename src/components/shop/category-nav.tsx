"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  headerCategories,
  getHeaderCategoryUrl,
  isHeaderCategoryActive,
} from "@/lib/mock-data/categories";

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container-padding">
          <div className="section-container">
            <div className="flex items-center justify-center gap-8 py-4">
              {headerCategories.map((category) => (
                <Link
                  key={category.id}
                  href={getHeaderCategoryUrl(category)}
                  className={cn(
                    "relative pb-1 text-sm font-medium transition-colors hover:text-green-dark",
                    isHeaderCategoryActive(category, pathname)
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

      {/* Mobile Navigation - Clean horizontal scroll */}
      <div className="block w-full overflow-hidden lg:hidden">
        <div className="scrollbar-hide overflow-x-auto border-b border-gray-100">
          <div className="flex w-max min-w-full whitespace-nowrap">
            {headerCategories.map((category) => (
              <Link
                key={category.id}
                href={getHeaderCategoryUrl(category)}
                className={cn(
                  "relative flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                  isHeaderCategoryActive(category, pathname)
                    ? "text-green-dark after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-dark after:content-['']"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  useBreadcrumbs,
  type BreadcrumbItem as BreadcrumbItemType,
} from "@/hooks/use-breadcrumbs";

interface ShopBreadcrumbsProps {
  overrides?: BreadcrumbItemType[];
}

export function ShopBreadcrumbs({ overrides }: ShopBreadcrumbsProps) {
  const breadcrumbItems = useBreadcrumbs(overrides);

  // Filter out "Categories" breadcrumb
  const filteredBreadcrumbs = breadcrumbItems.filter(
    (item) => item.label !== "Categories",
  );

  // Don't render if only showing "Home" or empty
  if (filteredBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="pt-4">
      <div className="container-padding">
        <div className="section-container">
          <Breadcrumb>
            <BreadcrumbList>
              {filteredBreadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.href}
                          className="text-xs text-gray-600 transition-colors hover:text-green-dark"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-xs font-medium text-gray-900">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < filteredBreadcrumbs.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </nav>
  );
}

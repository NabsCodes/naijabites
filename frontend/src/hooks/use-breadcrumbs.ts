import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// A map for providing custom, human-readable labels for specific URL path segments.
const breadcrumbLabels: Record<string, string> = {
  shop: "Shop",
  products: "All Products",
  deals: "Deals",
  recommended: "Recommended",
  cart: "Cart",
  checkout: "Checkout",
};

/**
 * A hook to generate breadcrumbs from the current Next.js route.
 * It's designed to be simple, readable, and easy to maintain.
 *
 * @param {BreadcrumbItem[]} [overrides] - An optional array to manually provide breadcrumbs, bypassing automatic generation.
 * @returns {BreadcrumbItem[]} An array of breadcrumb items for the current page.
 */
export function useBreadcrumbs(overrides?: BreadcrumbItem[]): BreadcrumbItem[] {
  const pathname = usePathname();

  // If manual overrides are provided, use them directly.
  if (overrides) {
    return overrides;
  }

  // Always start with a link to the homepage.
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // Split the URL path into segments, filtering out any empty strings from slashes.
  const pathSegments = pathname.split("/").filter(Boolean);

  let currentPath = "";

  // Iterate over each segment to build the breadcrumb trail.
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLastSegment = index === pathSegments.length - 1;

    // Use a predefined label or just capitalize the segment.
    const label =
      breadcrumbLabels[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbs.push({
      label,
      // The last item is the current page, so it doesn't need a link.
      href: isLastSegment ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}

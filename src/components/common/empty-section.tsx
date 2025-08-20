import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface EmptySectionProps {
  icon?: "bag" | "search" | "order";
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  contactText?: string;
}

export function EmptySection({
  icon = "bag",
  title,
  description,
  actionText = "Browse All Products",
  actionHref = "/shop/products",
  contactText,
}: EmptySectionProps) {
  const getIconComponent = () => {
    switch (icon) {
      case "search":
        return MagnifyingGlassIcon;
      case "order":
        return DocumentMagnifyingGlassIcon;
      default:
        return ShoppingBagIcon;
    }
  };

  const getDefaultContent = () => {
    if (icon === "search") {
      return {
        title: "No results found",
        description:
          "We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our full collection.",
      };
    }

    return {
      title: "No products available",
      description:
        "We're working hard to stock this section with amazing Nigerian groceries. Check back soon for new arrivals!",
    };
  };

  const IconComponent = getIconComponent();
  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayDescription = description || defaultContent.description;

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-green-deep/10 bg-green-dark/10">
        <IconComponent className="h-10 w-10 text-green-dark" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 sm:max-w-md">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {displayTitle}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
          {displayDescription}
        </p>
      </div>

      {/* Action */}
      <Button
        asChild
        className="group bg-green-dark text-white shadow-sm transition-all duration-300 hover:bg-green-dark/90"
      >
        <Link href={actionHref} className="flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          {actionText}
        </Link>
      </Button>

      {/* Contact Us */}
      <div className="flex items-center gap-1 text-sm text-gray-400">
        {contactText || "Have any questions?"}{" "}
        <Link
          href="/contact"
          className="text-green-dark transition-colors duration-300 hover:text-green-dark/90 hover:underline"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

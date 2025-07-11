import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProductFilters, buildFilterUrl } from "@/lib/product-filters";
import { formatPrice } from "@/lib/utils";

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  ratings: number[];
  sortOptions?: { value: string; label: string }[];
}

export function useFilterState(
  filterOptions: FilterOptions,
  appliedFilters: ProductFilters,
) {
  const router = useRouter();
  const pathname = usePathname();

  // Local state
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState([
    appliedFilters.minPrice || filterOptions.priceRange.min,
    appliedFilters.maxPrice || filterOptions.priceRange.max,
  ]);
  const [priceInputs, setPriceInputs] = useState({
    min: appliedFilters.minPrice?.toString() || "",
    max: appliedFilters.maxPrice?.toString() || "",
  });

  // Sync price range with applied filters
  useEffect(() => {
    const newMin = appliedFilters.minPrice || filterOptions.priceRange.min;
    const newMax = appliedFilters.maxPrice || filterOptions.priceRange.max;
    setPriceRange([newMin, newMax]);

    setPriceInputs({
      min: appliedFilters.minPrice?.toString() || "",
      max: appliedFilters.maxPrice?.toString() || "",
    });
  }, [
    appliedFilters.minPrice,
    appliedFilters.maxPrice,
    filterOptions.priceRange,
  ]);

  // Filter brands by search
  const filteredBrands = filterOptions.brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  // Check if any filters are active
  const hasActiveFilters = !!(
    appliedFilters.category ||
    appliedFilters.brand ||
    appliedFilters.minPrice ||
    appliedFilters.maxPrice ||
    appliedFilters.rating ||
    appliedFilters.onSale ||
    appliedFilters.search
  );

  // Count active filters for badge
  const activeFilterCount = [
    appliedFilters.category,
    appliedFilters.brand,
    appliedFilters.minPrice || appliedFilters.maxPrice,
    appliedFilters.rating,
    appliedFilters.onSale,
    appliedFilters.search,
  ].filter(Boolean).length;

  // Helper to update filters via URL
  const updateFilter = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...appliedFilters, ...newFilters, page: 1 };
    const newUrl = buildFilterUrl(pathname, updatedFilters);
    router.push(newUrl);
  };

  // Smart reset: clear additional filters but stay on current page context
  const clearAllFilters = () => {
    if (pathname.includes("/deals") || pathname.includes("/recommended")) {
      // For specialized pages, go back to all products
      router.push("/shop/products");
    } else {
      // For regular pages, just clear filters
      router.push(pathname);
    }
  };

  // Price handlers
  const handlePriceSliderChange = (value: number[]) => {
    setPriceRange(value);
    setPriceInputs({
      min: value[0] !== filterOptions.priceRange.min ? value[0].toString() : "",
      max: value[1] !== filterOptions.priceRange.max ? value[1].toString() : "",
    });
  };

  const handlePriceInputChange = (type: "min" | "max", inputValue: string) => {
    setPriceInputs((prev) => ({ ...prev, [type]: inputValue }));

    if (inputValue) {
      const numValue = Number(inputValue);
      if (!isNaN(numValue)) {
        if (type === "min") {
          setPriceRange([numValue, priceRange[1]]);
        } else {
          setPriceRange([priceRange[0], numValue]);
        }
      }
    } else {
      if (type === "min") {
        setPriceRange([filterOptions.priceRange.min, priceRange[1]]);
      } else {
        setPriceRange([priceRange[0], filterOptions.priceRange.max]);
      }
    }
  };

  const applyPriceFilter = () => {
    updateFilter({
      minPrice:
        priceRange[0] !== filterOptions.priceRange.min
          ? priceRange[0]
          : undefined,
      maxPrice:
        priceRange[1] !== filterOptions.priceRange.max
          ? priceRange[1]
          : undefined,
    });
  };

  const getDisplayPrice = (value: number, type: "min" | "max") => {
    if (type === "min" && value === filterOptions.priceRange.min) return "Min";
    if (type === "max" && value === filterOptions.priceRange.max) return "Max";
    return formatPrice(value);
  };

  return {
    // State
    brandSearch,
    setBrandSearch,
    priceRange,
    priceInputs,
    filteredBrands,
    hasActiveFilters,
    activeFilterCount,

    // Actions
    updateFilter,
    clearAllFilters,
    handlePriceSliderChange,
    handlePriceInputChange,
    applyPriceFilter,
    getDisplayPrice,
  };
}

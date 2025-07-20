"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locations } from "@/lib/mock-data/locations";
import {
  HomeIcon,
  ShopIcon,
  CartIcon,
  AboutIcon,
  ContactIcon,
  LogoIcon,
} from "@/components/icons";
import { mockUser } from "@/lib/mock-data/user";
import { useCart } from "@/contexts/cart-context";
import { useSearch } from "@/hooks/use-search";
import { SearchAutocomplete } from "@/components/search";
import MobileNav from "./mobile-nav";

// Navigation items data
const navigationItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: ShopIcon },
  { href: "/about", label: "About Us", icon: AboutIcon },
  { href: "/contact", label: "Contact Us", icon: ContactIcon },
];

// Account menu items data
const accountMenuItems = [
  { icon: User, label: "My Profile", href: "/profile" },
  { icon: ShoppingCart, label: "My Orders", href: "/orders" },
  { icon: MapPin, label: "Addresses", href: "/addresses" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof locations)[0] | null
  >(null);
  const { totalItems } = useCart();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(mockUser.isLoggedIn);

  // Search functionality with autocomplete
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const {
    query: searchQuery,
    isOpen: isSearchOpen,
    suggestions,
    setQuery: setSearchQuery,
    setIsOpen: setIsSearchOpen,
    performSearch,
    clearSearch,
    handleSuggestionSelect,
    removeSuggestion,
    clearSearchHistory,
  } = useSearch();

  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch();
    }
  };

  // Handle input focus
  const handleSearchFocus = () => {
    // Always open dropdown to show recent searches
    setIsSearchOpen(true);
  };

  // Handle clicks outside to close autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-green-deep text-white">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container-padding">
          <div className="section-container py-4 lg:py-6">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
              {/* Logo Section */}
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <LogoIcon width={115} height={64} />
                </Link>
              </div>

              {/* Center Section: Search Bar + Navigation (Grouped) */}
              <div className="flex w-full flex-col gap-4">
                {/* Search Bar with Autocomplete */}
                <div
                  ref={searchContainerRef}
                  className="relative mx-auto w-full"
                >
                  <form
                    onSubmit={handleSearch}
                    className="flex w-full overflow-hidden rounded-lg bg-white shadow-md"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex min-w-[120px] items-center gap-2 rounded-none border-0 border-r border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="truncate text-sm">
                            {selectedLocation ? (
                              `${selectedLocation.city}, ${selectedLocation.province}`
                            ) : (
                              <>
                                <span className="lg:hidden">Location</span>
                                <span className="hidden lg:inline">
                                  Select location
                                </span>
                              </>
                            )}
                          </span>
                          {isMenuOpen ? (
                            <ChevronUp className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="max-h-[400px] w-full overflow-y-auto border-0 shadow-xl lg:w-[300px]"
                      >
                        {locations.map((location) => (
                          <DropdownMenuItem
                            key={location.id}
                            onClick={() => setSelectedLocation(location)}
                            className={`flex cursor-pointer flex-col items-start p-4 hover:bg-green-50 ${
                              selectedLocation?.id === location.id
                                ? "bg-green-50"
                                : ""
                            }`}
                          >
                            <div className="font-semibold text-gray-900">
                              {location.city}
                            </div>
                            <div className="text-xs text-gray-500">
                              {location.province} • ${location.deliveryFee}{" "}
                              delivery
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="relative flex flex-1">
                      <Input
                        type="text"
                        placeholder="Search for products, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleSearchFocus}
                        className="hidden flex-1 rounded-none border-0 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 lg:block"
                      />

                      {/* Clear button */}
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-[120px] top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-lemon-light text-green-dark transition-colors hover:bg-lemon-dark hover:text-green-deep"
                          aria-label="Clear search"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}

                      <Button
                        type="submit"
                        className="rounded-none border-0 bg-lemon-dark px-4 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:bg-lemon-dark/80"
                      >
                        <Search className="h-4 w-4" />
                        <span className="hidden lg:inline">Search</span>
                      </Button>
                    </div>
                  </form>

                  {/* Autocomplete Dropdown */}
                  {isSearchOpen && (
                    <SearchAutocomplete
                      suggestions={suggestions}
                      onSuggestionSelect={handleSuggestionSelect}
                      onRemoveSuggestion={removeSuggestion}
                      query={searchQuery}
                      className="absolute left-0 right-0 top-full z-50 mt-1"
                      onClearHistory={clearSearchHistory}
                    />
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center justify-between">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "text-lemon-light"
                          : "text-white hover:text-lemon-light"
                      }`}
                    >
                      <item.icon size={18} color="currentColor" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right Side: Auth + Cart + Profile */}
              <div className="flex items-center gap-4">
                {/* Auth Buttons or User Profile */}
                {isUserLoggedIn ? (
                  <>
                    {/* Cart */}
                    <Link href="/cart" className="relative" aria-label="Cart">
                      <button
                        type="button"
                        className="relative rounded-md border-none bg-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
                      >
                        <div className="relative flex items-center gap-3">
                          <div className="relative flex h-6 w-6 items-center justify-center">
                            <CartIcon size={24} color="currentColor" />
                            {totalItems > 0 && (
                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-2 min-w-[1.25rem] bg-orange-dark px-1.5 py-0.5 text-xs font-bold leading-none hover:bg-orange-dark"
                              >
                                {totalItems > 99 ? "99+" : totalItems}
                              </Badge>
                            )}
                          </div>
                          <span className="hidden lg:inline">Cart</span>
                        </div>
                      </button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-auto items-center gap-2 rounded-full border border-solid border-white bg-white/5 p-1.5 pr-3 transition-colors hover:bg-white/10 focus:bg-white/10 lg:gap-3 lg:pr-4"
                        >
                          <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                            <AvatarImage src={mockUser.avatar} />
                            <AvatarFallback className="bg-lemon-dark text-xs font-semibold text-green-dark lg:text-sm">
                              {mockUser.initials}
                            </AvatarFallback>
                          </Avatar>

                          <span className="hidden max-w-[80px] truncate text-xs font-semibold text-white sm:inline lg:max-w-none lg:text-sm">
                            {mockUser.name}
                          </span>

                          <ChevronDown className="h-4 w-4 flex-shrink-0 text-lemon-light lg:h-5 lg:w-5" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-56 border-0 bg-white shadow-xl"
                      >
                        <div className="border-b border-gray-100 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={mockUser.avatar} />
                              <AvatarFallback className="bg-lemon-dark text-sm font-semibold text-green-dark">
                                {mockUser.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">
                                {mockUser.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {mockUser.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {accountMenuItems.map((item) => (
                          <DropdownMenuItem key={item.label} asChild>
                            <Link
                              href={item.href}
                              className="flex cursor-pointer items-center px-3 py-2.5 hover:bg-gray-50"
                            >
                              <item.icon className="mr-3 h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}

                        <div className="border-t border-gray-100">
                          <DropdownMenuItem
                            className="cursor-pointer p-3 text-red-600 hover:bg-gray-50 focus:text-red-600"
                            onClick={() => setIsUserLoggedIn(false)}
                          >
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* Register Button: Icon on small screens, text on md+ */}
                    <Link href="/signup">
                      <Button className="flex h-11 items-center justify-center rounded-md bg-lemon-dark px-3 py-2 text-sm font-semibold text-green-dark shadow-md transition-all duration-200 hover:bg-lemon-dark/90 lg:px-6">
                        <span className="inline">Sign up</span>
                      </Button>
                    </Link>

                    {/* Login Button: Icon on small screens, text on md+ */}
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="flex h-11 items-center justify-center rounded-md border-2 border-white bg-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-green-deep lg:px-6"
                      >
                        <span className="inline">Log in</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <MobileNav
        cartItemsCount={totalItems}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isSearchOpen={isSearchOpen}
        suggestions={suggestions}
        handleSearchFocus={handleSearchFocus}
        handleSuggestionSelect={handleSuggestionSelect}
        onRemoveSuggestion={removeSuggestion}
        clearSearchHistory={clearSearchHistory}
        clearSearch={clearSearch}
      />
    </header>
  );
}

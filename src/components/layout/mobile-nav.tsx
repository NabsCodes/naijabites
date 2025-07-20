"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  ChevronDown,
  Settings,
  LogOut,
  X,
  ArrowLeft,
} from "lucide-react";
import { HomeIcon, ShopIcon, AboutIcon, ContactIcon } from "@/components/icons";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { locations } from "@/lib/mock-data/locations";
import { CartIcon, LogoIcon, Logo2Icon } from "@/components/icons";
import { mockUser } from "@/lib/mock-data/user";
import { SearchSuggestion } from "@/types/search";
import { SearchAutocomplete } from "@/components/search";

interface MobileNavProps {
  cartItemsCount: number;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (_value: boolean) => void;
  selectedLocation: (typeof locations)[0] | null;
  setSelectedLocation: (_location: (typeof locations)[0] | null) => void;
  // Search props for expandable header search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  isSearchOpen: boolean;
  isSearchLoading: boolean;
  suggestions: SearchSuggestion[];
  handleSearchFocus: () => void;
  handleSuggestionSelect: (suggestion: SearchSuggestion) => void;
  onRemoveSuggestion?: (suggestionId: string) => void;
  clearSearchHistory: () => void;
  clearSearch: () => void;
}

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
  { icon: MapPin, label: "My Addresses", href: "/addresses" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function MobileNav({
  cartItemsCount,
  isUserLoggedIn,
  setIsUserLoggedIn,
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearchOpen,
  isSearchLoading,
  suggestions,
  handleSearchFocus,
  handleSuggestionSelect,
  onRemoveSuggestion,
  clearSearchHistory,
  clearSearch,
}: MobileNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle search expand/collapse
  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      // When collapsing, clear the search
      setSearchQuery("");
    }
    // No auto-focus on mobile - users will tap the input when they want to type
  };

  // Handle clicks outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchExpanded, setSearchQuery]);

  return (
    <div className="lg:hidden">
      <div className="container-padding">
        {/* Mobile Header with Expandable Search */}
        <div className="relative">
          {/* Normal Header State */}
          <div
            className={`flex items-center justify-between py-4 transition-all duration-300 ${
              isSearchExpanded ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Left Group: Menu + Logo */}
            <div className="flex items-center gap-3">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="mt-2 flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="border-0 bg-white p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>

                  {/* Scrollable Content */}
                  <div className="h-full overflow-y-auto">
                    <div className="space-y-0">
                      {/* Logo Section */}
                      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
                        <Link href="/" onClick={() => setIsMenuOpen(false)}>
                          <Logo2Icon width={100} height={45} />
                        </Link>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-900 transition-colors hover:bg-gray-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Location Section Only (Search moved to header) */}
                      <div className="border-b border-gray-200 p-4">
                        <div>
                          <p className="mb-3 text-sm font-medium text-gray-700">
                            Delivery Location
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-green-600" />
                                  <span className="truncate">
                                    {selectedLocation
                                      ? `${selectedLocation.city}, ${selectedLocation.province}`
                                      : "Select delivery location"}
                                  </span>
                                </div>
                                <ChevronDown className="h-4 w-4 flex-shrink-0" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="max-h-[300px] w-64 overflow-y-auto border-0 shadow-xl"
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
                                    {location.province} • $
                                    {location.deliveryFee} delivery
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* User Profile Section */}
                      {isUserLoggedIn ? (
                        <div className="border-b border-gray-200 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0">
                              <Avatar className="h-12 w-12 ring-2 ring-green-200">
                                <AvatarImage
                                  src={mockUser.avatar}
                                  className="h-full w-full object-cover"
                                />
                                <AvatarFallback className="bg-green-600 text-sm font-semibold text-white">
                                  {mockUser.initials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-semibold text-gray-900">
                                {mockUser.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {mockUser.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-b border-gray-200 p-4">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Welcome to NaijaBites
                            </h3>
                            <div className="flex gap-3">
                              <Link href="/signup">
                                <Button
                                  className="flex-1 bg-green-dark text-white hover:bg-green-dark/90"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Sign up
                                </Button>
                              </Link>
                              <Link href="/login">
                                <Button
                                  variant="outline"
                                  className="flex-1 border-green-dark text-green-dark hover:bg-green-dark/5"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Log in
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Main Navigation */}
                      <div className="p-4">
                        <div className="space-y-1">
                          <div className="pb-3">
                            <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                              Main Menu
                            </p>
                          </div>
                          {navigationItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center gap-3 rounded-lg px-3 py-4 text-base font-medium transition-all duration-200 ${
                                pathname === item.href
                                  ? "bg-green-dark/5 text-green-dark"
                                  : "text-gray-700 hover:bg-green-dark/5"
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <item.icon size={20} color="currentColor" />
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Account Section (when logged in) */}
                        {isUserLoggedIn && (
                          <div className="mt-8 space-y-1">
                            <div className="pb-3">
                              <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                Account
                              </p>
                            </div>
                            {accountMenuItems.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-4 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Sign Out Section (when logged in) */}
                      {isUserLoggedIn && (
                        <div className="border-t border-gray-200 p-4">
                          <button
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-4 text-base font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                            onClick={() => {
                              setIsUserLoggedIn(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex-shrink-0">
                <LogoIcon width={90} height={45} />
              </Link>
            </div>

            {/* Right Group: Search + Cart + Auth */}
            <div className="flex items-center gap-1">
              {/* Search Icon */}
              <button
                type="button"
                onClick={handleSearchToggle}
                className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative" aria-label="Cart">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                  aria-label="View cart"
                >
                  <div className="relative">
                    <CartIcon size={24} color="currentColor" />
                    {cartItemsCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-2 min-w-[1.25rem] bg-orange-dark px-1.5 py-0.5 text-xs font-bold leading-none hover:bg-orange-dark"
                      >
                        {cartItemsCount > 99 ? "99+" : cartItemsCount}
                      </Badge>
                    )}
                  </div>
                </button>
              </Link>

              {/* User Profile/Auth */}
              {isUserLoggedIn ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                      aria-label="Open profile menu"
                    >
                      <div className="h-7 w-7 flex-shrink-0">
                        <Avatar className="h-7 w-7 border border-white/30">
                          <AvatarImage
                            src={mockUser.avatar}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback className="bg-lemon-dark text-xs font-semibold text-green-dark">
                            {mockUser.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="max-h-[80vh] w-64 overflow-y-auto border-0 bg-white p-0 shadow-xl"
                    sideOffset={8}
                  >
                    {/* User Info Header */}
                    <div className="border-b border-gray-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mockUser.avatar} />
                          <AvatarFallback className="bg-green-600 text-sm font-semibold text-white">
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

                    {/* Quick Actions */}
                    <div className="py-1">
                      {accountMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Navigation Access */}
                    <div className="border-t border-gray-100 py-1">
                      <button
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(true)}
                      >
                        <Menu className="h-4 w-4" />
                        <span>Browse Menu</span>
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-100 py-1">
                      <button
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-gray-50"
                        onClick={() => setIsUserLoggedIn(false)}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open login menu"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Expanded Search State */}
          <div
            className={`absolute inset-0 flex items-center transition-all duration-300 ${
              isSearchExpanded
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div ref={searchContainerRef} className="relative w-full">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                  aria-label="Close search"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Search Input */}
                <div className="relative flex-1">
                  <div className="flex overflow-hidden rounded-lg bg-white shadow-md">
                    <Input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      className="flex-1 rounded-none border-0 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      autoComplete="off"
                    />

                    {/* Clear button */}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-16 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-lemon-light text-green-dark transition-colors hover:bg-lemon-dark hover:text-green-deep"
                        aria-label="Clear search"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}

                    <Button
                      type="submit"
                      className="rounded-none border-0 bg-lemon-dark px-4 text-sm font-semibold text-white shadow-none hover:bg-lemon-dark/90"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Autocomplete Dropdown */}
                  {isSearchOpen && isSearchExpanded && (
                    <SearchAutocomplete
                      suggestions={suggestions}
                      onSuggestionSelect={handleSuggestionSelect}
                      onRemoveSuggestion={onRemoveSuggestion}
                      query={searchQuery}
                      isLoading={isSearchLoading}
                      className="absolute left-0 right-0 top-full z-50 mt-1"
                      onClearHistory={clearSearchHistory}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

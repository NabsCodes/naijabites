import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-deep text-white">
      {/* Main Footer Content */}
      <div className="container-padding py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Branding Section */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-lemon-light p-6 text-gray-900">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Bringing the market close to you
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-700">
                  Affordable Nigerian staples, delivered fast and reliably. Join
                  a growing community of customers who value quality,
                  affordability, and convenience.
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3">
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-green-deep text-white transition-colors hover:bg-green-700"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-green-deep text-white transition-colors hover:bg-green-700"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-green-deep text-white transition-colors hover:bg-green-700"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-green-deep text-white transition-colors hover:bg-green-700"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
                {/* Explore Column */}
                <div>
                  <h4 className="mb-4 text-lg font-semibold">Explore</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/products"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Shop Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faq"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* My Account Column */}
                <div>
                  <h4 className="mb-4 text-lg font-semibold">My Account</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/auth"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Order History
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Shopping Cart
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support Column */}
                <div>
                  <h4 className="mb-4 text-lg font-semibold">Support</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/returns"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Return policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        Terms & Condition
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Logo Column */}
                <div className="flex justify-end">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lemon-light">
                      <span className="text-lg font-bold text-green-deep">
                        🛒
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold leading-tight text-white">
                        NAIJA
                      </h2>
                      <p className="text-xs font-semibold leading-tight text-lemon-light">
                        BITES
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-600">
        <div className="container-padding py-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-300">
                © 2023 Naijabites. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

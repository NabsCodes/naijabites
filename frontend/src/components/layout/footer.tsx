import Link from "next/link";
import { LogoSingleIcon } from "@/components/icons/logo-single-icon";
import { Logo2Icon } from "@/components/icons/logo-2-icon";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-green-deep">
      {/* Main Footer Content */}
      <div className="container-padding py-12 md:py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Side - Yellow/Cream Background */}
            <div className="relative overflow-hidden rounded-3xl bg-[#F5F8C0] p-8 lg:col-span-5">
              {/* Logo-single-icon positioned prominently at bottom right */}
              <div className="absolute -bottom-1 -right-8 opacity-20">
                <LogoSingleIcon width={230} height={230} />
              </div>

              <div className="relative z-10 max-w-md lg:max-w-lg xl:max-w-md">
                <h3 className="mb-4 text-2xl font-semibold leading-tight text-gray-900 lg:text-4xl">
                  Bringing the market close to you
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-700 md:text-base xl:max-w-xs">
                  Affordable Nigerian staples, delivered fast and reliably. Join
                  a growing community of customers who value quality,
                  affordability, and convenience.
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center gap-4">
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-deep text-white transition-all duration-300 hover:bg-green-deep/80"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-deep text-white transition-all duration-300 hover:bg-green-deep/80"
                    aria-label="Twitter"
                  >
                    <FaXTwitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-deep text-white transition-all duration-300 hover:bg-green-deep/80"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-deep text-white transition-all duration-300 hover:bg-green-deep/80"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Gray Background with Logo-2 */}
            <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-[#EDF2EE] p-8 lg:col-span-7">
              {/* Top Section - 4 Column Grid: 3 Link Columns + Logo */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
                {/* Logo Column */}
                <div className="flex justify-start sm:hidden">
                  <Link href="/" className="h-14 flex-shrink-0">
                    <Logo2Icon width={115} height={54} />
                  </Link>
                </div>
                {/* Explore Column */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-gray-500">
                    Explore
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/products"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Shop Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faq"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* My Account Column */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-gray-500">
                    Account
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/auth"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Order History
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Shopping Cart
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support Column */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-gray-500">
                    Support
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/returns"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Return policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                      >
                        Terms & Condition
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Logo Column */}
                <div className="hidden justify-end sm:flex">
                  <Link href="/" className="h-14 flex-shrink-0">
                    <Logo2Icon width={115} height={54} />
                  </Link>
                </div>
              </div>

              {/* Border Separator */}
              <div className="border-t border-gray-400"></div>

              {/* Bottom Section - Copyright */}
              <div className="flex items-center justify-center">
                <p className="text-center text-sm text-gray-600">
                  © {new Date().getFullYear()} Naijabites. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

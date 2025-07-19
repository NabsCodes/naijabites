import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/cart-context";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s - NaijaBites",
    default: "NaijaBites - Authentic Nigerian Groceries in Canada",
  },
  description:
    "Shop the finest selection of Nigerian rice, spices, vegetables, and traditional foods. Bringing the taste of home to your doorstep across Canada.",
  keywords:
    "Nigerian groceries, African food, Nigerian rice, spices, Canada delivery, authentic ingredients",
  authors: [{ name: "NaijaBites" }],
  openGraph: {
    title: "NaijaBites - Authentic Nigerian Groceries in Canada",
    description:
      "Shop the finest selection of Nigerian rice, spices, vegetables, and traditional foods.",
    type: "website",
    locale: "en_CA",
    siteName: "NaijaBites",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaijaBites - Authentic Nigerian Groceries in Canada",
    description:
      "Shop the finest selection of Nigerian rice, spices, vegetables, and traditional foods.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

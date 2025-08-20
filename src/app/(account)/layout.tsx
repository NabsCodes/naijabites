import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AccountNav, AccountNavTabsMobile } from "@/components/account";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    template: "%s | My Account - Naijabites",
    default: "My Account - Naijabites",
  },
  description: "Manage your profile, orders, and preferences",
  keywords: ["account", "profile", "orders", "wishlist"],
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container-padding py-8">
          <div className="section-container">
            <div className="mb-4 lg:mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-2 text-gray-600">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-8">
              <AccountNavTabsMobile />
              {/* Sidebar */}
              <div className="hidden lg:sticky lg:top-40 lg:col-span-1 lg:block lg:self-start">
                <AccountNav />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 lg:min-h-screen">
                <Card className="rounded-2xl border bg-white p-6 shadow-none">
                  {children}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

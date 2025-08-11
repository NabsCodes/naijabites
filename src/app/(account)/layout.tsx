import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AccountNav } from "@/components/account";

export default function AccountLayout({
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-2 text-gray-600">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:sticky lg:top-40 lg:col-span-1 lg:self-start">
                <Suspense fallback={<div>Loading...</div>}>
                  <AccountNav />
                </Suspense>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 lg:min-h-screen">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

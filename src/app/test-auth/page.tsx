"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  isLoggedIn,
  getAccessToken,
  getCustomerData,
  getCustomerName,
  getCustomerEmail,
  getCustomerInitials,
  logout,
  fetchCustomerData,
} from "@/lib/auth";

export default function TestAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState({
    isLoggedIn: false,
    hasToken: false,
    hasCustomerData: false,
    customerData: null as any,
  });

  // Check auth status on mount and when it changes
  const checkAuthStatus = () => {
    const loggedIn = isLoggedIn();
    const token = getAccessToken();
    const customerData = getCustomerData();

    setAuthStatus({
      isLoggedIn: loggedIn,
      hasToken: !!token,
      hasCustomerData: !!customerData,
      customerData,
    });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Login failed");
        return;
      }

      setSuccess("Login successful! Fetching customer data...");

      // Test customer data fetching
      const customerData = await fetchCustomerData();
      if (customerData) {
        setSuccess("✅ Login and customer data fetch successful!");
      } else {
        setError("❌ Login successful but customer data fetch failed");
      }

      // Update auth status
      checkAuthStatus();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    checkAuthStatus();
    setSuccess("Logged out successfully");
    setError(null);
  };

  const handleRefreshCustomerData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const customerData = await fetchCustomerData();
      if (customerData) {
        setSuccess("Customer data refreshed successfully");
        checkAuthStatus();
      } else {
        setError("Failed to refresh customer data");
      }
    } catch (err) {
      setError("Error refreshing customer data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Authentication Test Page</h1>

      {/* Status Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Login Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-semibold ${authStatus.isLoggedIn ? "text-green-600" : "text-red-600"}`}
            >
              {authStatus.isLoggedIn ? "✅ Logged In" : "❌ Not Logged In"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Token Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-semibold ${authStatus.hasToken ? "text-green-600" : "text-red-600"}`}
            >
              {authStatus.hasToken ? "✅ Token Present" : "❌ No Token"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Customer Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-semibold ${authStatus.hasCustomerData ? "text-green-600" : "text-red-600"}`}
            >
              {authStatus.hasCustomerData ? "✅ Data Loaded" : "❌ No Data"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Data Display */}
      {authStatus.hasCustomerData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Name:</strong> {getCustomerName()}
              </div>
              <div>
                <strong>Email:</strong> {getCustomerEmail()}
              </div>
              <div>
                <strong>Initials:</strong> {getCustomerInitials()}
              </div>
              <div>
                <strong>Raw Data:</strong>
              </div>
              <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                {JSON.stringify(authStatus.customerData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Login Form */}
      {!authStatus.isLoggedIn ? (
        <Card>
          <CardHeader>
            <CardTitle>Login Test</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Testing Login..." : "Test Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Logged In Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleRefreshCustomerData}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Refreshing..." : "Refresh Customer Data"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      {error && (
        <Card className="mt-4 border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="font-medium text-red-600">{error}</div>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="mt-4 border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="font-medium text-green-600">{success}</div>
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Token:</strong>{" "}
              {getAccessToken() ? "Present" : "Not found"}
            </div>
            <div>
              <strong>localStorage customer_data:</strong>{" "}
              {localStorage.getItem("customer_data") ? "Present" : "Not found"}
            </div>
            <div>
              <strong>Cookies:</strong>{" "}
              {document.cookie.includes("access_token")
                ? "Present"
                : "Not found"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

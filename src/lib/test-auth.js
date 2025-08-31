// Test script for authentication functionality
// Run this in browser console to test auth features

window.testAuth = {
  // Test login functionality
  async testLogin(email, password) {
    console.log("🧪 Testing login...");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Login failed:", result.error);
        return false;
      }

      console.log("✅ Login successful:", result);
      return true;
    } catch (error) {
      console.error("❌ Login error:", error);
      return false;
    }
  },

  // Test customer data fetching
  async testCustomerData() {
    console.log("🧪 Testing customer data fetch...");

    try {
      const response = await fetch("/api/customer", {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("❌ Customer data fetch failed:", response.status);
        return false;
      }

      const customerData = await response.json();
      console.log("✅ Customer data:", customerData);
      return customerData;
    } catch (error) {
      console.error("❌ Customer data error:", error);
      return false;
    }
  },

  // Get token from cookies
  getToken() {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
  },

  // Check localStorage for customer data
  checkCustomerData() {
    const data = localStorage.getItem("customer_data");
    if (data) {
      console.log("✅ Customer data in localStorage:", JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.log("❌ No customer data in localStorage");
      return null;
    }
  },

  // Run full test suite
  async runFullTest(email, password) {
    console.log("🚀 Starting full auth test...");

    // Test 1: Login
    const loginSuccess = await this.testLogin(email, password);
    if (!loginSuccess) {
      console.log("❌ Test failed at login step");
      return;
    }

    // Test 2: Check token
    const token = this.getToken();
    if (token) {
      console.log("✅ Token found in cookies");
    } else {
      console.log("❌ No token found in cookies");
      return;
    }

    // Test 3: Fetch customer data
    const customerData = await this.testCustomerData();
    if (!customerData) {
      console.log("❌ Test failed at customer data step");
      return;
    }

    // Test 4: Check localStorage
    const storedData = this.checkCustomerData();
    if (storedData) {
      console.log("✅ Customer data stored in localStorage");
    } else {
      console.log("❌ Customer data not stored in localStorage");
    }

    console.log("🎉 Full test completed!");
  },

  // Clear all auth data
  clearAll() {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("customer_data");
    console.log("🧹 All auth data cleared");
  },
};

console.log("🔧 Auth test utilities loaded!");
console.log("Usage:");
console.log("- testAuth.runFullTest(email, password) - Run complete test");
console.log("- testAuth.testLogin(email, password) - Test login only");
console.log("- testAuth.testCustomerData() - Test customer data fetch");
console.log("- testAuth.checkCustomerData() - Check localStorage");
console.log("- testAuth.clearAll() - Clear all auth data");

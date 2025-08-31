import { shopifyCustomerFetch } from "@/lib/shopify";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    console.log(
      "🔍 Fetching customer data with token:",
      token.substring(0, 10) + "...",
    );

    const data = await shopifyCustomerFetch(query, token, {
      customerAccessToken: token,
    });
    console.log("📦 Shopify response:", data);

    // Check for GraphQL errors
    if (data.errors) {
      console.error("❌ GraphQL errors:", data.errors);
      return Response.json(
        {
          error: "GraphQL query failed",
          details: data.errors,
        },
        { status: 400 },
      );
    }

    if (!data.customer) {
      console.error("❌ No customer data in response:", data);
      return Response.json({ error: "Customer not found" }, { status: 404 });
    }

    console.log("✅ Customer data fetched successfully:", data.customer);
    return Response.json(data.customer);
  } catch (error) {
    console.error("❌ Error fetching customer data:", error);
    return Response.json(
      {
        error: "Failed to fetch customer data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

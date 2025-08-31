// src/app/api/signup/route.ts
import { redis } from "@/lib/redis";
import { shopifyFetch } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, otp } = await req.json();
    const storedOtp = await redis.get(`otp:code:${email}`);
    if (!storedOtp || Number(storedOtp) !== Number(otp)) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }
    const query = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            message
            code
          }
        }
      }
    `;

    const variables = {
      input: {
        email,
        password,
        firstName,
        lastName,
      },
    };

    const data = await shopifyFetch(query, variables);
    const { customerCreate } = data;

    if (customerCreate.customerUserErrors.length > 0) {
      return Response.json(
        { error: customerCreate.customerUserErrors[0].message },
        { status: 400 },
      );
    }

    // Automatically log them in after signup
    const tokenQuery = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            message
          }
        }
      }
    `;

    const tokenData = await shopifyFetch(tokenQuery, {
      input: { email, password },
    });

    const { customerAccessTokenCreate } = tokenData;

    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      return Response.json(
        { error: customerAccessTokenCreate.customerUserErrors[0].message },
        { status: 401 },
      );
    }

    return Response.json(customerAccessTokenCreate.customerAccessToken);
  } catch (error) {
    console.error("❌ Error in /api/signup:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// src/app/api/forgot-password/route.ts
import { shopifyFetch } from '@/lib/shopify';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const query = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            message
            code
          }
        }
      }
    `;

    const data = await shopifyFetch(query, { email });

    const errors = data.customerRecover.customerUserErrors;

    if (errors.length > 0) {
      return Response.json({ error: errors[0].message }, { status: 400 });
    }
    console.log('🟢 Forgot password API success:', data);
    return Response.json({ success: true, message: "Password reset email sent." });
  } catch (err) {
    console.error("❌ Forgot password API error:", err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

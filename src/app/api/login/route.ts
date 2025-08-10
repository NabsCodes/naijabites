import { shopifyFetch } from '@/lib/shopify';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log('The login api is being called')
  const query = `
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

  const data = await shopifyFetch(query, {
    input: { email, password }
  });

  if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    return Response.json({ error: data.customerAccessTokenCreate.customerUserErrors[0].message }, { status: 401 });
  }

  return Response.json(data.customerAccessTokenCreate.customerAccessToken);
}

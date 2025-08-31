import { shopifyCustomerFetch } from '@/lib/shopify';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  const query = `
    query getCustomer {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    const data = await shopifyCustomerFetch(query, token);
    
    if (!data.customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    return Response.json(data.customer);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return Response.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
} 
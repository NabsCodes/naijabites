import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const CUSTOMER_DATA_KEY = 'customer_data';

export function saveLogin(token: string) {
  Cookies.set(ACCESS_TOKEN_KEY, token, { 
    expires: 7, // 7 days
    secure: true, // Only sent over HTTPS
    sameSite: 'strict' // CSRF protection
  });
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!Cookies.get(ACCESS_TOKEN_KEY);
}

export function logout() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CUSTOMER_DATA_KEY);
}

// Customer data management
export interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export function saveCustomerData(customer: CustomerData) {
  localStorage.setItem(CUSTOMER_DATA_KEY, JSON.stringify(customer));
}

export function getCustomerData(): CustomerData | null {
  const data = localStorage.getItem(CUSTOMER_DATA_KEY);
  return data ? JSON.parse(data) : null;
}

export function getCustomerInitials(): string {
  const customer = getCustomerData();
  if (!customer) return 'U';
  return customer.firstName.charAt(0).toUpperCase();
}

export function getCustomerName(): string {
  const customer = getCustomerData();
  if (!customer) return 'User';
  return `${customer.firstName} ${customer.lastName}`;
}

export function getCustomerEmail(): string {
  const customer = getCustomerData();
  if (!customer) return '';
  return customer.email;
}

// Fetch customer data from Shopify
export async function fetchCustomerData(): Promise<CustomerData | null> {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/customer', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const customer = await response.json();
    saveCustomerData(customer);
    return customer;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return null;
  }
}

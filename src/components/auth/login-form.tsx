'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveLogin, fetchCustomerData } from '@/lib/auth';

export function LoginForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); // Clear old error

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('🟡 Login response:', res);
      const result = await res.json();

      if (!res.ok) {
        console.error('🔴 Login failed:', result.error);
        setError(result.error);
        return;
      }

      console.log('🟢 Login successful:', result);

      // Save token in cookies using auth.ts
      saveLogin(result.accessToken);

      // Fetch and save customer data
      await fetchCustomerData();

      router.push('/'); // Or wherever you want to go
    } catch (err) {
      console.error('🔴 Unexpected error:', err);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        {error && (
          <p className="text-sm text-red-500 text-center" data-error>
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

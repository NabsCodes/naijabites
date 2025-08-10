"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function ShopifyStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkShopifyStatus = async () => {
      try {
        const response = await fetch('/api/shopify/test');
        const data = await response.json();
        
        if (data.success) {
          setStatus('connected');
          setMessage(`Connected to Shopify (${data.productsCount} products found)`);
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to connect to Shopify');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error connecting to Shopify');
      }
    };

    checkShopifyStatus();
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-lg border">
        {status === 'loading' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-600">Connecting to Shopify...</span>
          </>
        )}
        {status === 'connected' && (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">{message}</span>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-600">{message}</span>
          </>
        )}
      </div>
    </div>
  );
}
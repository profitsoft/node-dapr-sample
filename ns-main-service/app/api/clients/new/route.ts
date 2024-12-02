import { NextResponse } from 'next/server';
import config from '@/config';

export async function POST(request: Request) {
  const { name, address, tenantId } = await request.json();

  const { NEXT_PUBLIC_CLIENT_API_URL } = config;

  try {
    const apiResponse = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        tenantId: tenantId,
      },
      body: JSON.stringify({
        name,
        address,
      }),
    });

    if (!apiResponse.ok) {
      return NextResponse.json({ message: 'Failed to create client' });
    }

    const client = await apiResponse.json();
    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}

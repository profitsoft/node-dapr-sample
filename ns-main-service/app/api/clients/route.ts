import config from '@/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  try {
    const { NEXT_PUBLIC_CLIENT_API_URL } = config;
    const response = await fetch(
      `${NEXT_PUBLIC_CLIENT_API_URL}?limit=${limit}&offset=${offset}`,
    );
    const result = await response.json();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch clients' });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clientId: string } },
) {
  const { clientId } = params;

  const { NEXT_PUBLIC_CLIENT_API_URL } = config;

  try {
    await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(null);
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}

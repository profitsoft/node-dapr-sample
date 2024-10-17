import { NextResponse } from 'next/server';
import config from '@/config';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, address, tenantId } = await request.json();
  const {
    NEXT_PUBLIC_CLIENT_API_URL,
  } = config;
  try {
    const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'tenantId': tenantId,
      },
      body: JSON.stringify({ name, address }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Failed to update client.'}`);
    }
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id)
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
  try {
    const apiResponse = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/${parseInt(id)}`, {
      method: 'GET',
    });

    if (!apiResponse.ok) {
      return NextResponse.json({ message: `Client not found with id ${id} ` });
    }
    const client = await apiResponse.json();
    return NextResponse.json( { client } );
  } catch (error) {
    console.error('Error fetching client from external API:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
  try {
    await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message || 'Failed to delete client.'}`);
    } else {
      throw new Error('Failed to delete client due to an unknown error.');
    }
  }
}

import config from '@/config';

export async function getAllClients(): Promise<Client[]> {
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
  const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}`)
  return await response.json()
}

export async function getClientById(id: number): Promise<Client> {
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
  const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/${id}`)
  return await response.json()
}

export async function updateClient({
  id,
  name,
  address,
  tenantId,
}: {
  id: number;
  name: string;
  address: string | null;
  tenantId: string;
}): Promise<Client> {
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
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
    return await response.json(); // Return the updated client data
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error; // Rethrow or handle the error as needed
  }
}

export async function saveClient({
   name,
   address,
   tenantId,
 }: {
  name: string;
  address: string | null;
  tenantId: string;
}): Promise<Client> {
  const {
    NEXT_PUBLIC_CLIENT_API_URL
  } = config
  try {
    const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}`, {
      method: 'POST',
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
    return await response.json();
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
}

export async function deleteClientById(id: number): Promise<Client[]> {
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
    return await getAllClients();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message || 'Failed to delete client.'}`);
    } else {
      throw new Error('Failed to delete client due to an unknown error.');
    }
  }
}
"use client"
import { Container, Title, Text, Button, TextInput, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getClientById, saveClient, updateClient } from '@/app/api/actions/clients/clients';
import { useRouter } from 'next/navigation';

const ClientPage = ({ params }: { params: { clientId: string } }) => {
  const { clientId } = params;
  const router = useRouter();

  const [state, setState] = useState({
    name: '',
    address: '',
    tenantId: '',
    isEditing: false,
  });

  useEffect(() => {
    const fetchClient = async() => {
      if (clientId == 'new') {
        setState({
          ...state,
          isEditing: true,
        });
      } else {
        const client = await getClientById(parseInt(clientId));
        setState({
          name: client.name || '',
          address: client.address || '',
          tenantId: client.tenantId || '',
          isEditing: false,
        });
      }
    };
    fetchClient();
  }, [clientId]);

  const handleUpdate = async () => {
    if (clientId == 'new') {
      const newClient = await saveClient({
        name: state.name!,
        address: state.address,
        tenantId: state.tenantId,
      });
      setState({...state, isEditing: false})
      router.replace(`/clients/${newClient.id}`);
    } else {
      await updateClient({
        id: parseInt(clientId),
        name: state.name!,
        address: state.address,
        tenantId: state.tenantId,
      });
      setState({...state, isEditing: false})
    }
  };

  return (
    <Container mt="20px">
      <Title order={2}>Client Details</Title>

      {state.isEditing ? (
        <div>
          <TextInput
            label="Name"
            value={state.name}
            onChange={(event) => setState({ ...state, name: event.currentTarget.value })}
            required
          />
          <TextInput
            label="Address"
            value={state.address}
            onChange={(event) => setState({ ...state, address: event.currentTarget.value })}
            required
          />
          <TextInput
            label="Tenant ID"
            value={state.tenantId}
            onChange={(event) => setState({ ...state, tenantId: event.currentTarget.value })}
            required
          />
          <Group  mt="md">
            <Button onClick={handleUpdate}>Update Client</Button>
            <Button
              onClick={() => {
                if (clientId === 'new') {
                  router.push('/clients')
                } else {
                  setState({ ...state, isEditing: false });
                }
              }}
              color='gray'
            >
              Cancel
            </Button>
          </Group>
        </div>
      ) : (
        <div>
          <Text size="lg">Name: {state.name}</Text>
          <Text size="lg">Address: {state.address}</Text>
          <Text size="lg">Tenant ID: {state.tenantId}</Text>
          <Group mt="md">
            <Button onClick={() => setState({ ...state, isEditing: true })}>Edit Client</Button>
          </Group>
        </div>
      )}
    </Container>
  );
};

export default ClientPage
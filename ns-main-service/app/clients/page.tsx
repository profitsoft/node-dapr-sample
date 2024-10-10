'use client';
import { Container, Grid, Card, Text, Title, GridCol, ActionIcon, Button } from '@mantine/core';
import classes from './Page.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteClientById, getAllClients } from '@/app/api/actions/clients/clients';
import { IconTrash } from '@tabler/icons-react';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients()
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
        setError("Some error occurred. Please try again")
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (clientId: number) => {
    try {
      const clients = await deleteClientById(clientId)
      setClients(clients)
    } catch (error) {
      setError("Some error occurred. Please try again")
    }
  };

  return (
    <Container mt='20px'>
      <Title order={2}>Clients List</Title>
      <Button component={Link} href={`/clients/new`} mt='md' mb='5px'>
        Додати
      </Button>
      {loading ? (
        <p>Loading clients...</p>
      ) : error ? (
        <p>{error}</p>
      ) : clients.length === 0 ? (
        <p>No clients</p>
      ) : (
        <Grid>
          {clients.map((client: Client) => (
            <GridCol key={client.id}>
              <Link href={`/clients/${client.id}`} className={classes.cardLink} passHref>
                <Card
                  shadow='sm'
                  padding='lg'
                  radius='md'
                  withBorder
                  className={classes.clientCard}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                  <div>
                    <Text size='lg'>{client.name}</Text>
                    <Text c='dimmed' size='sm'>Address: {client.address}</Text>
                    <Text c='dimmed' size='sm'>TenantId: {client.tenantId}</Text>
                  </div>
                  <ActionIcon
                    color="red"
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(client.id!);
                    }}
                    className={classes.deleteIcon}
                    style={{ marginLeft: 'auto' }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Card>
              </Link>
            </GridCol>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ClientsPage;

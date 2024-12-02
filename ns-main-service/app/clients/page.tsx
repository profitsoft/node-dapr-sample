'use client';
import {
  Container,
  Grid,
  Card,
  Text,
  Title,
  GridCol,
  ActionIcon,
  Button,
  Pagination,
} from '@mantine/core';
import classes from './page.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchClients();
  }, [page]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `/api/clients?offset=${offset}&limit=${limit}`,
      );
      const { result } = await response.json();
      setClients(result.data);
      setTotal(result.total);
    } catch (error) {
      setErrorMessage('Some error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId: number) => {
    try {
      setLoading(true);
      await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
      fetchClients();
    } catch (error) {
      setErrorMessage('Some error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container mt="20px">
      <Title order={2}>Clients List</Title>
      <Button component={Link} href={`/clients/new`} mt="md" mb="5px">
        Додати
      </Button>
      {loading && <p>Loading clients...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!clients.length && !loading && <p>No clients</p>}
      {!loading && !errorMessage && clients.length > 0 && (
        <>
          <Grid>
            {clients.map((client: Client) => (
              <GridCol key={client.id}>
                <Link
                  href={`/clients/${client.id}`}
                  className={classes.cardLink}
                  passHref
                >
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className={classes.clientCard}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <Text size="lg">{client.name}</Text>
                      <Text c="dimmed" size="sm">
                        Address: {client.address}
                      </Text>
                      <Text c="dimmed" size="sm">
                        TenantId: {client.tenantId}
                      </Text>
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
          <Pagination
            value={page}
            onChange={setPage}
            total={Math.ceil(total / limit)}
            mt="md"
          />
        </>
      )}
    </Container>
  );
};

export default ClientsPage;

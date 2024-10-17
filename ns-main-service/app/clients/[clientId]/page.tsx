"use client"
import { Button, Container, Group, Title } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CustomTextInput } from '@/components/CustomTextInput';
import { useForm } from '@mantine/form';


const ClientPage = () => {
  const { clientId } = useParams<{ clientId: string }>()
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      tenantId: '',
    },
    validate: {
      name: (value) => (value.length === 0 ? 'Name is required' : null),
      tenantId: (value) => (value.length === 0 || !parseInt(value) ? 'Tenant ID is required and should be a number' : null),
    },
  });

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId === 'new') {
        setIsEdit(true);
      } else {
        const response = await fetch(`/api/clients/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client');
        }
        const json = await response.json();
        form.setValues({
          ...json.client,
        });
        setIsEdit(false);
      }
    };
    fetchClient();
  }, [clientId]);

  const handleSubmit = useCallback(
    async (values: typeof form.values) => {
      try {
        const url = clientId === 'new' ? `/api/clients/new` : `/api/clients/${clientId}`;
        const method = clientId === 'new' ? 'POST' : 'PUT';
        const response = await fetch(url, {
          method,
          body: JSON.stringify({
            name: values.name,
            address: values.address,
            tenantId: values.tenantId,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        form.setValues(json.client);
        setIsEdit(false);
        if (clientId === 'new') {
          router.replace(`/clients/${json.client.id}`);
        }
      } catch (error) {
        console.error('Failed to submit client data:', error);
      }
    },
    [clientId, form, router]
  );

  const handleEditMode = useCallback((value: boolean) => {
    if (clientId === 'new') {
      router.push(`/clients`);
    } else {
      setIsEdit(value);
    }
  }, [clientId]);

  return (
    <Container mt="20px">
      <Title order={2}>Client Details</Title>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        {['name', 'address', 'tenantId'].map((field) => (
          <CustomTextInput
            key={form.key(field)}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            {...form.getInputProps(field)}
            required={field === 'name' || field === 'tenantId'}
            isEdit={isEdit}
            error={typeof form.errors[field] === 'string' ? form.errors[field] as string : undefined}
          />
        ))}
        <Group mt="md">
          {isEdit ? (
            <>
              <Button type='submit'>Update Client</Button>
              <Button
                onClick={() => handleEditMode(false)}
                color='gray'
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => handleEditMode(true)}>Edit Client</Button>
          )}
        </Group>
      </form>
    </Container>
  );
};

export default ClientPage
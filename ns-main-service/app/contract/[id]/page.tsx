'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { parseISO, format } from 'date-fns';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

const ContractDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;

  const form = useForm({
    initialValues: {
      number: '',
      signDate: '',
      clientId: '',
      tenantId: '',
    },

    validate: {
      number: (value: string) => (value ? null : 'Number is required'),
      signDate: (value: string) => (value ? null : 'Sign Date is required'),
      clientId: (value: string) => (value ? null : 'Client ID is required'),
      tenantId: (value: string) => (value ? null : 'Tenant ID is required'),
    },
  });

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_CONTRACT_API_URL}/contracts/${id}`,
          );
          const data = await response.json();
          form.setValues({
            number: data.number || '',
            signDate: data.signDate
              ? format(parseISO(data.signDate), 'yyyy-MM-dd')
              : '',
            clientId: data.clientId || '',
            tenantId: data.tenantId || '',
          });
        }
      } catch (error) {
        console.error('Error fetching contract:', error);
      }
    };

    fetchContract();
  }, [id]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONTRACT_API_URL}/contracts/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );
      if (response.ok) {
        alert('Contract data updated successfully');
        router.push('/contract');
      } else {
        alert('Error updating contract');
      }
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contract {form.values.number}</h1>
      <div className={styles.tableContainer}>
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
          <TextInput
            label="Number"
            placeholder="Enter number"
            {...form.getInputProps('number')}
            required
          />

          <TextInput
            label="Sign Date"
            type="date"
            {...form.getInputProps('signDate')}
            required
          />

          <TextInput
            label="Client ID"
            placeholder="Enter client ID"
            {...form.getInputProps('clientId')}
            required
          />

          <TextInput
            label="Tenant ID"
            placeholder="Enter tenant ID"
            {...form.getInputProps('tenantId')}
            required
          />

          <Group mt="md" className={styles.buttonGroup}>
            <Button type="submit" className={styles.saveButton}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleBack}
              className={styles.backButton}
            >
              Back
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

export default ContractDetail;

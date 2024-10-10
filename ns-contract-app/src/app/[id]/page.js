'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function ContractDetail({ params }) {
  const router = useRouter();
  const { id } = params;

  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    signDate: '',
    clientId: '',
    tenantId: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/contracts/${id}`)
        .then(response => {
          setContract(response.data);
          setFormData({
            number: response.data.number,
            signDate: response.data.signDate.split('T')[0],
            clientId: response.data.clientId,
            tenantId: response.data.tenantId,
          });
        })
        .catch(error => {
          console.error('Помилка при отриманні контракту:', error);
        });
    }
  }, [id]);

  if (!contract) {
    return <div>Завантаження...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.number || !formData.signDate || !formData.clientId || !formData.tenantId) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }
    axios.put(`http://localhost:3000/contracts/${id}`, formData)
      .then(response => {
        alert('Дані контракту оновлено успішно');
        router.push('/');
      })
      .catch(error => {
        console.error('Помилка при оновленні контракту:', error);
      });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Контракт {contract.number}</h1>
      <div className={styles.tableContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Номер:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Дата підписання:</label>
          <input
            type="date"
            name="signDate"
            value={formData.signDate}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>ID клієнта:</label>
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>ID компанії:</label>
          <input
            type="text"
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Зберегти</button>
            <button type="button" onClick={handleBack} className={`${styles.button} ${styles.backButton}`}>Назад</button>
          </div>
        </form>
      </div>
    </div>
  );
}

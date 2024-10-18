'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const ContractsList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_CONTRACT_API_URL + '/contracts')
      .then((response) => response.json())
      .then((data) => {
        setContracts(data);
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contracts List</h1>
      <div className={styles.tableContainer}>
        <ul className={styles.list}>
          {contracts.map((contract) => (
            <li key={contract.id} className={styles.listItem}>
              <Link href={`/contract/${contract.id}`} className={styles.link}>
                {contract.number} -{' '}
                {contract.signDate
                  ? new Date(contract.signDate).toLocaleDateString()
                  : ''}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContractsList;

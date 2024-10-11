"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css";

export default function ContractsList() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contracts")
      .then((response) => {
        setContracts(response.data);
      })
      .catch((error) => {
        console.error("Помилка при отриманні контрактів:", error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Список контрактів</h1>
      <div className={styles.tableContainer}>
        <ul className={styles.list}>
          {contracts.map((contract) => (
            <li key={contract.id} className={styles.listItem}>
              <Link href={`/${contract.id}`} className={styles.link}>
                {contract.number} -{" "}
                {new Date(contract.signDate).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

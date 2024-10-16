import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { getDatasource } from './util';

const init = async () => {
  await Promise.all([initPostgres()]);
};

const initPostgres = async () => {
  const postgres = await new PostgreSqlContainer('postgres')
    .withDatabase('test')
    .withUsername('test')
    .withPassword('test')
    .start();

  globalThis.testContainer = postgres;
  process.env.DB_HOST = postgres.getHost();
  process.env.DB_PORT = postgres.getPort().toString();
  process.env.DB_USERNAME = postgres.getUsername();
  process.env.DB_PASSWORD = postgres.getPassword();
  process.env.DB_DATABASE = postgres.getDatabase();

  const datasource = await getDatasource();
  await datasource.runMigrations();
};

export default init;

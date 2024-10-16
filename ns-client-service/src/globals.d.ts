import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

declare global {
  namespace globalThis {
    var testContainer: StartedPostgreSqlContainer;
  }
}

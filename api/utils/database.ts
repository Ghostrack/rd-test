import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { PostgreSqlContainer } from "@testcontainers/postgresql";

/**
 * Initialise test database container.
 *
 * @returns Database client.
 */
export const initTestDatabase = async (): Promise<NodePgDatabase> => {
  const container = await new PostgreSqlContainer().start();

  process.env.DATABASE_URL = container.getConnectionUri();

  const database = drizzle(process.env.DATABASE_URL);

  await migrate(database, { migrationsFolder: "./drizzle" });

  return database;
};

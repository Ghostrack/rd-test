import {
  drizzle,
  type NodePgDatabase,
} from "drizzle-orm/node-postgres";

import { books } from "./schema/books";

/** DB schema. */
export const schema = {
  books,
};

/**
 * Get DB Client.
 *
 * @returns Node PG DB Client.
 */
export const getClient = (): NodePgDatabase => {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error("missing required env variable DATABASE_URL");
  }

  return drizzle(process.env.DATABASE_URL);
};

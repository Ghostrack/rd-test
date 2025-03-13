import { defineConfig } from "drizzle-kit";

import "dotenv/config";

/** Drizzle config for managing migrations. */
export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  dialect: "postgresql",
  out    : "./drizzle",
  schema : "./db/schema",
});

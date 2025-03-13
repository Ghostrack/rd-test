import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createSelectSchema } from "drizzle-typebox";

/** Import job body. */
export interface ImportJobBody {

  /** Book id. */
  bookId: string;

  /** Book type. */
  type: "evernote" | "pdf" | "wattpad" | "word";

  /** Book url. */
  url: string;

}

/** Export job body. */
export interface ExportJobBody {

  /** Book id. */
  bookId: string;

  /** Book type. */
  type: "epub" | "pdf";

}

/** Create job input data. */
export type CreateJobData = typeof jobs.$inferInsert;

/** Job db item. */
export type Job = typeof jobs.$inferSelect;

/** Jobs table definition. */
export const jobs = pgTable("jobs", {
  body:
    jsonb()
      .$type<ExportJobBody | ImportJobBody>()
      .notNull(),

  createdAt:
    timestamp()
      .notNull()
      .defaultNow(),

  id:
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity(),

  name:
    varchar({ length: 255 })
      .notNull(),

  state:
    varchar({ length: 255 })
      .notNull()
      .default("pending"),

  updatedAt:
    timestamp()
      .notNull()
      .defaultNow(),
});

/** Job table static schema. */
export const JobSchema = createSelectSchema(jobs);

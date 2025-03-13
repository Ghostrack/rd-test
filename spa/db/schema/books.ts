import {
  integer,
  jsonb,
  numeric,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";

/** Link for purchasing a book. */
export interface BookLink {

  /** Store name. */
  name: string;

  /** Link to book page in the store. */
  url: string;

}

/** Create book input data. */
export type CreateBookData = typeof books.$inferInsert;

/** Book db item. */
export type Book = typeof books.$inferSelect;

/** Books table definition. */
export const books = pgTable("books", {
  author:
    varchar({ length: 255 })
      .notNull(),

  coverUrl:
    varchar({ length: 255 })
      .notNull(),

  description:
    text(),

  id:
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity(),

  links:
    jsonb()
      .$type<BookLink[]>()
      .default([]),

  rating:
    numeric({
      precision: 3,
      scale    : 1,
    }),

  title:
    varchar({ length: 255 })
      .notNull(),

  year:
    smallint()
      .notNull(),
});

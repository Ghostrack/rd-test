import { Book, books } from "~/db/schema/books";
import { getClient } from "~/db";

export const booksPageSize = 5;

/** GET /books API endpoint response body. */
export interface GetBooksResponse {

  /** Current page. */
  currentPage: number;

  /** Book items in current page. */
  data: Book[];

  /** Total page count. */
  pageCount: number;

}

/**
 * GET /books API endpoint.
 * Returns requested page of books from the database.
 *
 * @params event Contains page query parameter.
 *
 * @returns Requested books db records page.
 */
export default defineEventHandler(async (event): Promise<GetBooksResponse> => {
  const { page }     = getQuery(event);
  const currentPage  = typeof page === "string" ? Number.parseInt(page) : 1;

  const count = await getClient().$count(books);
  const data  = await getClient()
    .select()
    .from(books)
    .limit(booksPageSize)
    .offset((currentPage - 1) * booksPageSize);

  return {
    currentPage,
    data,
    pageCount: Math.ceil(count / booksPageSize),
  };
});

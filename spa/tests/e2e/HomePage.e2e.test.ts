import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createPage,
  fetch,
  setup,
  url,
} from "@nuxt/test-utils/e2e";

import { setTimeout } from "node:timers/promises";

import type { GetBooksResponse } from "../../server/api/books.get";

/** Home Page e2e tests. */
// eslint-disable-next-line max-lines-per-function
describe("Home Page e2e tests", async () => {
  const waitTime = 500;

  await setup();

  it("expands and collapse book details on a row click", async () => {
    const page           = await createPage("/");
    const [row]          = await page.getByTestId("books-table-row").all();
    const rowDescription = row.getByTestId("book-description");

    expect(await rowDescription.isVisible()).toEqual(false);

    await row.click();
    await setTimeout(waitTime);

    expect(await rowDescription.isVisible()).toEqual(true);

    await row.click();
    await setTimeout(waitTime);

    expect(await rowDescription.isVisible()).toEqual(false);
  });

  it("opens a new tab when a book row link is clicked", async () => {
    const page   = await createPage("/");
    const [row]  = await page.getByTestId("books-table-row").all();
    const [link] = await row.getByTestId("book-store-link").all();

    await link.click();

    const linkUrl = await link.getAttribute("href");
    const popup   = await page.waitForEvent("popup");

    expect(popup.url()).toEqual(linkUrl);
  });

  it("shows first page by default", async () => {
    const page     = await createPage("/");
    const response = await fetch("/api/books?page=1");
    const { data } = await response.json() as GetBooksResponse;

    const rows = await page.getByTestId("books-table-row").all();

    expect(rows.length).toEqual(data.length);

    for (const [index, book] of data.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }
  });

  it("shows page specified in query parameters", async () => {
    const page     = await createPage("/?page=2");
    const response = await fetch("/api/books?page=2");
    const { data } = await response.json() as GetBooksResponse;

    const rows = await page.getByTestId("books-table-row").all();

    expect(rows.length).toEqual(data.length);

    for (const [index, book] of data.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }
  });

  it("redirects to first page when trying to navigate to a non-existing page", async () => {
    const response      = await fetch("/api/books");
    const { pageCount } = await response.json() as GetBooksResponse;

    const page = await createPage(`/?page=${(pageCount + 1).toString()}`);

    expect(page.url()).toEqual(url("/?page=1"));
  });

  it("shows next page when clicking next page button", async () => {
    const page                    = await createPage("/");
    const firstPageResponse       = await fetch("/api/books?page=1");
    const { data: firstPageData } = await firstPageResponse.json() as GetBooksResponse;

    const rows = await page.getByTestId("books-table-row").all();

    expect(rows.length).toEqual(firstPageData.length);

    for (const [index, book] of firstPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }

    const nextPageButton = page.getByTestId("next-page-button");

    await nextPageButton.click();
    await setTimeout(waitTime);

    for (const [index, book] of firstPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(false);
    }

    const secondPageResponse       = await fetch("/api/books?page=2");
    const { data: secondPageData } = await secondPageResponse.json() as GetBooksResponse;

    expect(rows.length).toEqual(secondPageData.length);

    for (const [index, book] of secondPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }
  });

  it("hides next page button after reaching last page", async () => {
    const response      = await fetch("/api/books");
    const { pageCount } = await response.json() as GetBooksResponse;
    const page          = await createPage(`/?page=${(pageCount - 1).toString()}`);

    const nextPageButton = page.getByTestId("next-page-button");

    expect(await nextPageButton.isVisible()).toEqual(true);

    await nextPageButton.click();
    await setTimeout(waitTime);

    expect(page.url()).toEqual(url(`/?page=${(pageCount).toString()}`));
    expect(await nextPageButton.isVisible()).toEqual(false);
  });

  it("shows previous page when clicking previous page button", async () => {
    const page                     = await createPage("/?page=2");
    const secondPageResponse       = await fetch("/api/books?page=2");
    const { data: secondPageData } = await secondPageResponse.json() as GetBooksResponse;

    const rows = await page.getByTestId("books-table-row").all();

    expect(rows.length).toEqual(secondPageData.length);

    for (const [index, book] of secondPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }

    const previousPageButton = page.getByTestId("previous-page-button");

    await previousPageButton.click();
    await setTimeout(waitTime);

    for (const [index, book] of secondPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(false);
    }

    const firstPageResponse       = await fetch("/api/books?page=1");
    const { data: firstPageData } = await firstPageResponse.json() as GetBooksResponse;

    expect(rows.length).toEqual(firstPageData.length);

    for (const [index, book] of firstPageData.entries()) {
      const row = rows[index].getByText(book.title);

      expect(await row.isVisible()).toEqual(true);
    }
  });

  it("hides previous page button after reaching first page", async () => {
    const page           = await createPage("/?page=2");
    const previousPageButton = page.getByTestId("previous-page-button");

    expect(await previousPageButton.isVisible()).toEqual(true);

    await previousPageButton.click();
    await setTimeout(waitTime);

    expect(page.url()).toEqual(url("/?page=1"));
    expect(await previousPageButton.isVisible()).toEqual(false);
  });
});

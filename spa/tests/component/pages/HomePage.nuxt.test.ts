import { describe, expect, it } from "vitest";

import HomePage from "../../../pages/index.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

/** Home Page component unit tests. */
describe("Home Page unit tests", () => {
  it("main component has correct class", async () => {
    const wrapper = await mountSuspended(HomePage);

    expect(wrapper.classes()).toContain("HomePage");
  });

  it("home page title has correct class", async () => {
    const wrapper = await mountSuspended(HomePage);
    const title   = wrapper.get("[data-testid='home-page-title']");

    expect(title.classes()).toContain("HomePageTitle");
  });

  it("contains books table", async () => {
    const wrapper    = await mountSuspended(HomePage);
    const booksTable = wrapper.find("[data-testid='books-table']");

    expect(booksTable.isVisible()).toBeTruthy();
  });

  it("contains pagination", async () => {
    const wrapper    = await mountSuspended(HomePage);
    const booksTable = wrapper.find("[data-testid='pagination']");

    expect(booksTable.isVisible()).toBeTruthy();
  });

  it("pagination has correct class", async () => {
    const wrapper    = await mountSuspended(HomePage);
    const booksTable = wrapper.find("[data-testid='pagination']");

    expect(booksTable.classes()).toContain("BooksTablePagination");
  });
});

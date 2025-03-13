import {
  describe,
  expect,
  it,
} from "vitest";

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { UiPagination } from "#components";

const getWrapper = async () => mountSuspended(UiPagination, {
  props: {
    currentPage: 1,
    pageCount  : 3,
  },
});

/** UiPagination component unit tests. */
// eslint-disable-next-line max-lines-per-function
describe("UiPagination component tests", () => {
  it("assigns the correct class to the main component", async () => {
    const wrapper = await getWrapper();

    expect(wrapper.classes()).toContainEqual("Pagination");
  });

  it("disables the previous page button on the first page", async () => {
    const wrapper = await getWrapper();

    await wrapper.setProps({ currentPage: 1 });

    const previousPageButton = wrapper.find("[data-testid='previous-page-button']");

    expect(previousPageButton.attributes()).toHaveProperty("disabled")
  });

  it("shows the previous page button on pages after the first", async () => {
    const wrapper = await getWrapper();

    await wrapper.setProps({ currentPage: 2 });

    const previousPageButton = wrapper.find("[data-testid='previous-page-button']");

    expect(previousPageButton.attributes()).not.toHaveProperty("disabled");
  });

  it("disables the next page button on the last page", async () => {
    const wrapper = await getWrapper();

    await wrapper.setProps({
      currentPage: 3,
      pageCount  : 3,
    });

    const previousPageButton = wrapper.find("[data-testid='next-page-button']");

    expect(previousPageButton.attributes()).toHaveProperty("disabled");
  });

  it("shows the next page button on pages before the last", async () => {
    const wrapper = await getWrapper();

    await wrapper.setProps({ currentPage: 2 });

    const previousPageButton = wrapper.find("[data-testid='next-page-button']");

    expect(previousPageButton.attributes()).not.toHaveProperty("disabled");
  });

  it("emits a page-change event when previous page button is clicked", async () => {
    const wrapper     = await getWrapper();
    const currentPage = 2;

    await wrapper.setProps({ currentPage });

    expect(wrapper.emitted("pageChange")).toBeUndefined();

    const previousPageButton = wrapper.find("[data-testid='previous-page-button']");

    await previousPageButton.trigger("click");

    expect(wrapper.emitted("pageChange")).toBeDefined();
    expect(wrapper.emitted("pageChange")?.length).toEqual(1);
    expect(wrapper.emitted("pageChange")?.[0]).toContain(currentPage - 1);
  });

  it("emits a page-change event when next page button is clicked", async () => {
    const wrapper     = await getWrapper();
    const currentPage = 2;

    await wrapper.setProps({ currentPage });

    expect(wrapper.emitted("pageChange")).toBeUndefined();

    const nextPageButton = wrapper.find("[data-testid='next-page-button']");

    await nextPageButton.trigger("click");

    expect(wrapper.emitted("pageChange")).toBeDefined();
    expect(wrapper.emitted("pageChange")?.length).toEqual(1);
    expect(wrapper.emitted("pageChange")?.[0]).toContain(currentPage + 1);
  });

  it("displays current page and page count", async () => {
    const wrapper     = await getWrapper();
    const currentPage = 2;
    const pageCount   = 5;

    await wrapper.setProps({
      currentPage,
      pageCount,
    });

    const paginationStatus = wrapper.find("[data-testid='pagination-status']");

    expect(paginationStatus.text()).toMatch(currentPage.toString());
    expect(paginationStatus.text()).toMatch(pageCount.toString());
  });
});

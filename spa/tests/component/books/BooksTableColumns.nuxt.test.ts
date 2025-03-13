import {
  describe,
  expect,
  it,
} from "vitest";

import { BooksTableColumns } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";

/** BooksTableColumns component unit tests. */
describe("BooksTableColumns component tests", () => {
  it("displays a table row element", async () => {
    const wrapper = await mountSuspended(BooksTableColumns);

    expect(wrapper.element.tagName).toEqual("TR");
  });

  it("contains only table header elements", async () => {
    const wrapper  = await mountSuspended(BooksTableColumns);
    const children = wrapper.findAll("tr >")

    expect(children.length).toBeGreaterThan(0);

    for (const child of children) {
      expect(child.element.tagName).toEqual("TH");
    }
  });
});

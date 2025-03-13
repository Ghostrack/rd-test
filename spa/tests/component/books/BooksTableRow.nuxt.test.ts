import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BooksDetails,
  BooksLinks,
  BooksTableRow,
} from "#components";

import { mountSuspended } from "@nuxt/test-utils/runtime";

/** BooksTableRow component unit tests. */
// eslint-disable-next-line max-lines-per-function
describe("BooksTableRow component tests", () => {
  const book = {
    author     : "Edgar Allan Poe",
    coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication1/v4/79/2f/56/792f5696-0fd9-5a3b-b7a1-e875784ed9db/9781101157220.jpg/600x600bb.jpg",
    description: "After reading an 1836 newspaper account of a shipwreck and its two survivors, Edgar Allan Poe penned his only novel, The Narrative of Arthur Gordon Pym of Nantucket, the story of a stowaway on a Nantucket whaleship who finds himself enmeshed in the dark side of life at sea: mutiny, cannibalism, savagery—even death. As Jeffrey Meyers writes in his Introduction: “[Poe] remains contemporary because he appeals to basic human feelings and expresses universal themes common to all men in all languages: dreams, love, loss; grief, mourning, alienation; terror, revenge, murder; insanity, disease, and death.” Within the pages of this novel, we encounter nearly all of them.",
    id         : 1,
    links      : [
      {
        name: "eBooks",
        url : "https://www.ebooks.com/en-gb/book/463592/the-narrative-of-arthur-gordon-pym-of-nantucket/edgar-allan-poe/",
      },
      {
        name: "Hive",
        url : "https://www.hive.co.uk/Product/Edgar-Allan-Poe/Narrative-of-Arthur-Gordon-Pym-of-Nantucket/27461210",
      },
    ],
    rating: "9.9",
    title : "The Narrative of Arthur Gordon Pym of Nantucket",
    year  : 1838,
  };

  const getWrapper = () => mountSuspended(BooksTableRow, {
    props: {
      data: book,
    },
  });

  it("assigns the correct class to the main component", async () => {
    const wrapper = await getWrapper();

    expect(wrapper.classes()).toContainEqual("BooksTableRow");
  });

  it("displays the book details component in the title column", async () => {
    const wrapper              = await getWrapper();
    const titleColumn          = wrapper.find("[data-testid='books-table-title-column']");
    const bookDetailsComponent = titleColumn.findComponent(BooksDetails);

    expect(bookDetailsComponent.isVisible()).toEqual(true);
  });

  it("displays the book release year in the year column", async () => {
    const wrapper    = await getWrapper();
    const yearColumn = wrapper.find("[data-testid='books-table-year-column']");

    expect(yearColumn.text()).toMatch(book.year.toString());
  });

  it("displays the book rating in the rating column", async () => {
    const wrapper      = await getWrapper();
    const ratingColumn = wrapper.find("[data-testid='books-table-rating-column']");

    expect(ratingColumn.text()).toMatch(book.rating);
  });

  it("rounds the rating to 10 if the original rating is 10.0", async () => {
    const wrapper = await getWrapper();

    await wrapper.setProps({
      data: {
        ...book,
        rating: "10.0",
      },
    });

    const ratingColumn = wrapper.find("[data-testid='books-table-rating-column']");

    expect(ratingColumn.text()).toMatch("10");
    expect(ratingColumn.text()).toMatch(/^(?<rating>(?!10.0).)*$/u);
  });

  it("displays the book links component in the links column", async () => {
    const wrapper            = await getWrapper();
    const linksColumn        = wrapper.find("[data-testid='books-table-links-column']");
    const bookLinksComponent = linksColumn.findComponent(BooksLinks);

    expect(bookLinksComponent.isVisible()).toEqual(true);
  });

  it("hides the description by default", async () => {
    const wrapper     = await getWrapper();
    const description = wrapper.find("[data-testid='book-description']");

    expect(description.exists()).toEqual(false);
  });

  it("toggles the description on row click", async () => {
    const wrapper = await getWrapper();

    await wrapper.trigger("click");

    let description = wrapper.find("[data-testid='book-description']");

    expect(description.exists()).toEqual(true);
    expect(description.isVisible()).toEqual(true);

    await wrapper.trigger("click");

    description = wrapper.find("[data-testid='book-description']");

    expect(description.exists()).toEqual(false);
  });

  it("displays the book description text", async () => {
    const wrapper = await getWrapper();

    await wrapper.trigger("click");

    const description = wrapper.find("[data-testid='book-description']");

    expect(description.text()).toMatch(book.description);
  });
});

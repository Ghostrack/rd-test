import {
  describe,
  expect,
  it,
} from "vitest";

import { BooksDetails } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";

/** BooksDetails component unit tests. */
// eslint-disable-next-line max-lines-per-function
describe("BooksDetails component tests", () => {
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

  const getWrapper = () => mountSuspended(BooksDetails, {
    props: {
      book,
    },
  });

  it("assigns the correct class to the main component", async () => {
    const wrapper = await getWrapper();

    expect(wrapper.classes()).toContainEqual("BookDetails");
  });

  it("assigns the correct testid attribute to the main component", async () => {
    const wrapper = await getWrapper();

    expect(wrapper.attributes()["data-testid"]).toEqual("book-details");
  });

  it("displays the book cover image", async () => {
    const wrapper    = await getWrapper();
    const coverImage = wrapper.find("[data-testid='book-cover-image']");

    expect(coverImage.attributes().src).toEqual(book.coverUrl);
  });

  it("displays the book cover image in an img element", async () => {
    const wrapper    = await getWrapper();
    const coverImage = wrapper.find("[data-testid='book-cover-image']");

    expect(coverImage.element.tagName).toEqual("IMG");
  });

  it("displays the book title", async () => {
    const wrapper    = await getWrapper();
    const coverImage = wrapper.find("[data-testid='book-title']");

    expect(coverImage.text()).toMatch(book.title);
  });

  it("displays the book author", async () => {
    const wrapper    = await getWrapper();
    const coverImage = wrapper.find("[data-testid='book-author']");

    expect(coverImage.text()).toMatch(book.author);
  });
});

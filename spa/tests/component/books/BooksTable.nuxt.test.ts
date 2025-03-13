import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BooksTable,
  BooksTableColumns,
  BooksTableRow,
} from "#components";

import { mountSuspended } from "@nuxt/test-utils/runtime";

/** BooksTable component unit tests. */
// eslint-disable-next-line max-lines-per-function
describe("BooksTable component tests", () => {
  const books = [
    {

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
    },
    {
      author     : "J. R. R. Tolkien",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/dc/b9/16/dcb91663-fb27-71ce-e49e-c842e10406ad/9780007322602.jpg/600x600bb.jpg",
      description: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent.",
      id         : 2,
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/1230900/the-hobbit/j-r-r-tolkien/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/J-R-R-Tolkien/The-Hobbit/11379738",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/J_R_R_Tolkien_The_Hobbit?id=U799AY3yfqcC&hl=en_GB",
        },
      ],
      rating: "10",
      title : "The Hobbit",
      year  : 1937,
    },
  ];

  const getWrapper = () => mountSuspended(BooksTable, {
    props: {
      data: books,
    },
  });

  it("assigns the correct class to the main component", async () => {
    const wrapper = await getWrapper();

    expect(wrapper.classes()).toContainEqual("Table");
  });

  it("assigns the correct class to the table body element", async () => {
    const wrapper   = await getWrapper();
    const tableBody = wrapper.find("[data-testid='books-table']");

    expect(tableBody.classes()).toContainEqual("BooksTable");
  });

  it("displays the books table column component", async () => {
    const wrapper   = await getWrapper();
    const component = wrapper.findComponent(BooksTableColumns);

    expect(component.isVisible()).toEqual(true);
  });

  it("displays the books table row components", async () => {
    const wrapper    = await getWrapper();
    const components = wrapper.findAllComponents(BooksTableRow);

    for (const component of components) {
      expect(component.isVisible()).toEqual(true);
    }
  });

  it("displays a books table row component for each book in props", async () => {
    const wrapper    = await getWrapper();
    const components = wrapper.findAllComponents(BooksTableRow);

    expect(components.length).toEqual(books.length);
  });
});

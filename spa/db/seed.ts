/* eslint-disable max-lines */
import { books } from "./schema/books";
import { getClient } from ".";

// eslint-disable-next-line max-lines-per-function
const seed = async () => {
  const booksInserts = [
    {
      author     : "Edgar Allan Poe",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication1/v4/79/2f/56/792f5696-0fd9-5a3b-b7a1-e875784ed9db/9781101157220.jpg/600x600bb.jpg",
      description: "After reading an 1836 newspaper account of a shipwreck and its two survivors, Edgar Allan Poe penned his only novel, The Narrative of Arthur Gordon Pym of Nantucket, the story of a stowaway on a Nantucket whaleship who finds himself enmeshed in the dark side of life at sea: mutiny, cannibalism, savagery—even death. As Jeffrey Meyers writes in his Introduction: “[Poe] remains contemporary because he appeals to basic human feelings and expresses universal themes common to all men in all languages: dreams, love, loss; grief, mourning, alienation; terror, revenge, murder; insanity, disease, and death.” Within the pages of this novel, we encounter nearly all of them.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/463592/the-narrative-of-arthur-gordon-pym-of-nantucket/edgar-allan-poe/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Edgar-Allan-Poe/Narrative-of-Arthur-Gordon-Pym-of-Nantucket/27461210",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Edgar_Allan_Poe_The_Narrative_of_Arthur_Gordon_Pym?id=dKkfTaJCDW4C&hl=en_GB",
        },
      ],
      rating: "10",
      title : "The Narrative of Arthur Gordon Pym of Nantucket",
      year  : 1838,
    },
    {
      author     : "J. R. R. Tolkien",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/dc/b9/16/dcb91663-fb27-71ce-e49e-c842e10406ad/9780007322602.jpg/600x600bb.jpg",
      description: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent.",
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
    {
      author     : "Lemony Snicket",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/1b/91/92/1b919278-f1cc-281b-166b-aef8d07c0f96/9780061757099.jpg/600x600bb.jpg",
      description: "I'm sorry to say that the book you are holding in your hands is extremely unpleasant. It tells an unhappy tale about three very unlucky children. Even though they are charming and clever, the Baudelaire siblings lead lives filled with misery and woe. From the very first page of this book when the children are at the beach and receive terrible news, continuing on through the entire story, disaster lurks at their heels. One might say they are magnets for misfortune.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/1237594/a-series-of-unfortunate-events-1-the-bad-beginning/lemony-snicket/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Lemony-Snicket/A-Series-of-Unfortunate-Events-1-The-Bad-Beginning/14721782",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Lemony_Snicket_A_Series_of_Unfortunate_Events_1_Th?id=sUtrdMJvFXAC&hl=en_GB",
        },
      ],
      rating: "8.4",
      title : "The Bad Beginning",
      year  : 1999,
    },
    {
      author     : "Robert Jordan",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication112/v4/52/84/f4/5284f4a8-6238-cd90-4718-8b216c9ec2f3/9780748115341.jpg/600x600bb.jpg",
      description: "The Wheel of Time turns and Ages come and pass, leaving memories that become legend. Legend fades to myth, and even myth is long forgotten when the Age that gave it birth returns again. What was, what will be, and what is, may yet fall under the Shadow.\n\nMoiraine Damodred arrives in Emond’s Field on a quest to find the one prophesized to stand against The Dark One, a malicious entity sowing the seeds of chaos and destruction. When a vicious band of half-men, half beasts invade the village seeking their master’s enemy, Moiraine persuades Rand al’Thor and his friends to leave their home and enter a larger unimaginable world filled with dangers waiting in the shadows and in the light.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/759880/the-eye-of-the-world/robert-jordan/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Robert-Jordan/The-Eye-Of-The-World--Book-1-of-the-Wheel-of-Time-Now-a-major-TV-series/11479233",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Robert_Jordan_The_Eye_Of_The_World?id=MXj0THxYdkMC&hl=en_GB",
        },
      ],
      rating: "8.2",
      title : "The Eye of the World",
      year  : 1990,
    },
    {
      author     : "Jane Austen",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/bf/89/e1/bf89e156-bea5-3980-763a-4cbec5b9f365/cover2.jpg/600x600bb.jpg",
      description: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.' The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen's radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/210515961/pride-and-prejudice/jane-austen/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Jane-Austen/Pride-and-Prejudice/362467",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Jane_Austen_Pride_and_Prejudice?id=pGUhydKogaAC&hl=en_GB",
        },
      ],
      rating: "8.6",
      title : "Pride and Prejudice",
      year  : 1813,
    },
    {
      author     : "George Orwell",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/ad/61/af/ad61afec-5bb3-4db6-a737-3989f68eb336/Cover.jpg/600x600bb.jpg",
      description: "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible.\n\nWhen Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/210160629/animal-farm/george-orwell/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Orwell-George-Orwell/Animal-Farm/31411288",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/George_Orwell_Animal_Farm?id=AQLJ2IxOvOAC&hl=en_GB",
        },
      ],
      rating: "8.0",
      title : "Animal Farm",
      year  : 1945,
    },
    {
      author     : "Oscar Wilde",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/ed/ab/0f/edab0fb6-65df-efd4-c4d1-afd90667632c/9789895621958.jpg/600x600bb.jpg",
      description: "In this celebrated work Wilde forged a devastating portrait of the effects of evil and debauchery on a young aesthete in late-19th-century England. Combining elements of the Gothic horror novel and decadent French fiction, the book centers on a striking premise: As Dorian Gray sinks into a life of crime and gross sensuality, his body retains perfect youth and vigor while his recently painted portrait grows day by day into a hideous record of evil, which he must keep hidden from the world. For over a century, this mesmerizing tale of horror and suspense has enjoyed wide popularity. It ranks as one of Wilde's most important creations and among the classic achievements of its kind.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/2707395/the-picture-of-dorian-gray/oscar-wilde/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Oscar-Wilde/The-Picture-of-Dorian-Gray/22176182",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Oscar_Wilde_The_Picture_of_Dorian_Gray_Collins_Cla?id=BJ50Ho--8yYC&hl=en_GB",
        },
      ],
      rating: "8.3",
      title : "The Picture of Dorian Gray",
      year  : 1890,
    },
    {
      author     : "Emily Brontë",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication126/v4/0c/bf/42/0cbf4235-bb67-b8fa-9905-6e08522665e8/9781480484092.jpg/600x600bb.jpg",
      description: "Emily Brontë's only novel, a work of tremendous and far-reaching influence, the Penguin Classics edition of Wuthering Heights is the definitive edition of the text, edited with an introduction by Pauline Nestor. Lockwood, the new tenant of Thrushcross Grange, situated on the bleak Yorkshire moors, is forced to seek shelter one night at Wuthering Heights, the home of his landlord. There he discovers the history of the tempestuous events that took place years before; of the intense relationship between the gypsy foundling Heathcliff and Catherine Earnshaw; and how Catherine, forced to choose between passionate, tortured Heathcliff and gentle, well-bred Edgar Linton, surrendered to the expectations of her class. As Heathcliff's bitterness and vengeance at his betrayal is visited upon the next generation, their innocent heirs must struggle to escape the legacy of the past.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/1737736/wuthering-heights/emily-bront/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Emily-Bronte/Wuthering-Heights/15956168",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Emily_Bront%C3%AB_Wuthering_Heights_Collins_Classics?id=ulu5qH8R2jcC&hl=en_GB",
        },
      ],
      rating: "7.8",
      title : "Wuthering Heights",
      year  : 1847,
    },
    {
      author     : "L. M. Montgomery",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/29/d7/30/29d7301d-af95-06bc-42b5-1f68b6b4c712/PD-Anne_of_Green_Gables-Adj.jpg/600x600bb.jpg",
      description: "This heartwarming story has beckoned generations of readers into the special world of Green Gables, an old-fashioned farm outside a town called Avonlea. Anne Shirley, an eleven-year-old orphan, has arrived in this verdant corner of Prince Edward Island only to discover that the Cuthberts—elderly Matthew and his stern sister, Marilla—want to adopt a boy, not a feisty redheaded girl. But before they can send her back, Anne—who simply must have more scope for her imagination and a real home—wins them over completely. A much-loved classic that explores all the vulnerability, expectations, and dreams of a child growing up, Anne of Green Gables is also a wonderful portrait of a time, a place, a family… and, most of all, love.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/1136307/anne-of-green-gables/l-m-montgomery/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/L-M-Montgomery/Anne-of-Green-Gables/16052371",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/L_M_Montgomery_Anne_of_Green_Gables?id=i5kBb0XMo6cC&hl=en_GB",
        },
      ],
      rating: "8.6",
      title : "Anne of Green Gables",
      year  : 1908,
    },
    {
      author     : "Bram Stoker",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication128/v4/d2/90/d1/d290d1e8-c8cb-7e3f-5ad8-3615943997df/Dracula-cover-big.jpg/600x600bb.jpg",
      description: "When Jonathan Harker visits Transylvania to help Count Dracula with the purchase of a London house, he makes a series of horrific discoveries about his client. Soon afterwards, various bizarre incidents unfold in England: an apparently unmanned ship is wrecked off the coast of Whitby; a young woman discovers strange puncture marks on her neck; and the inmate of a lunatic asylum raves about the 'Master' and his imminent arrival.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/210329703/dracula/bram-stoker/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Stoker-Bram-Stoker/Dracula/26197083",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Bram_Stoker_Dracula?id=djI6C38mYPgC&hl=en_GB",
        },
      ],
      rating: "8.0",
      title : "Dracula",
      year  : 1897,
    },
    {
      author     : "Charles Dickens",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/3e/fb/5a/3efb5a56-d055-6769-8a05-73fcc29ed905/9780141933795.jpg/600x600bb.jpg",
      description: "A Tale of Two Cities is Charles Dickens’s great historical novel, set against the violent upheaval of the French Revolution. The most famous and perhaps the most popular of his works, it compresses an event of immense complexity to the scale of a family history, with a cast of characters that includes a bloodthirsty ogress and an antihero as believably flawed as any in modern fiction. Though the least typical of the author’s novels, A Tale of Two Cities still underscores many of his enduring themes—imprisonment, injustice, social anarchy, resurrection, and the renunciation that fosters renewal.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/191877/a-tale-of-two-cities/charles-dickens/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Charles-Dickens/Tale-of-Two-Cities/13980047",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Charles_Dickens_A_TALE_OF_TWO_CITIES_Illustrated?id=N8JxDgAAQBAJ&hl=en_GB",
        },
      ],
      rating: "7.6",
      title : "A Tale of Two Cities",
      year  : 1859,
    },
    {
      author     : "Roald Dahl",
      coverUrl   : "https://is1-ssl.mzstatic.com/image/thumb/Publication126/v4/ff/63/72/ff637243-01b2-662a-19a8-6690b77b094c/9780141929453.jpg/600x600bb.jpg",
      description: "Matilda is a little girl who is far too good to be true. At age five-and-a-half she's knocking off double-digit multiplication problems and blitz-reading Dickens. Even more remarkably, her classmates love her even though she's a super-nerd and the teacher's pet. But everything is not perfect in Matilda's world...\n\nFor starters she has two of the most idiotic, self-centered parents who ever lived. Then there's the large, busty nightmare of a school principal, Miss ('The') Trunchbull, a former hammer-throwing champion who flings children at will, and is approximately as sympathetic as a bulldozer. Fortunately for Matilda, she has the inner resources to deal with such annoyances: astonishing intelligence, saintly patience, and an innate predilection for revenge.",
      links      : [
        {
          name: "eBooks",
          url : "https://www.ebooks.com/en-gb/book/210482427/matilda/roald-dahl/",
        },
        {
          name: "Hive",
          url : "https://www.hive.co.uk/Product/Roald-Dahl/Matilda/11400154",
        },
        {
          name: "Play Store",
          url : "https://play.google.com/store/books/details/Roald_Dahl_Matilda?id=_uIlE7DkAzYC&hl=en_GB",
        },
      ],
      rating: "8.6",
      title : "Matilda",
      year  : 1988,
    },
  ];

  console.log("starting database seeding");

  const database = getClient();

  await database.delete(books);

  for (const insert of booksInserts) {
    await database.insert(books).values(insert);
  }

  console.log("db seeded successfully");
};

export default seed;

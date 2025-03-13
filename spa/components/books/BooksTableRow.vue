<template>
  <tbody
    class="TableRow BooksTableRow"
    data-testid="books-table-row"
    @click="showDescription = !showDescription"
  >
    <tr>
      <td
        class="BooksTableTitleColumn"
        data-testid="books-table-title-column"
      >
        <BooksDetails :book="data" />
      </td>

      <td
        class="BooksTableYearColumn"
        data-testid="books-table-year-column"
      >
        {{ data.year }}
      </td>

      <td
        class="BooksTableRatingColumn"
        data-testid="books-table-rating-column"
      >
        {{ data.rating === "10.0" ? "10" : data.rating }}/10
      </td>

      <td
        class="BooksTableLinksColumn"
        data-testid="books-table-links-column"
      >
        <BooksLinks :book="data" />
      </td>
    </tr>

    <Transition @after-enter="scrollIntoView">
      <p
        v-if="showDescription"
        ref="description"
        class="BookDescription"
        data-testid="book-description"
      >
        {{ data.description }}
      </p>
    </Transition>
  </tbody>
</template>

<script setup lang="ts">

import type { Book } from "../../db/schema/books";

defineProps<{
  data: Book;
}>();

const descriptionElement = useTemplateRef("description");
const showDescription    = ref(false);

const scrollIntoView = () => {
  descriptionElement.value?.scrollIntoView({
    behavior: "smooth",
    block   : "center",
  });
};

</script>

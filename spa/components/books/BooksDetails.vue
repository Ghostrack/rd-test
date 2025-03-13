<template>
  <div
    class="BookDetails"
    data-testid="book-details"
  >
    <img
      class="BookCoverImage"
      data-testid="book-cover-image"
      :src="book.coverUrl"
    >

    <div
      class="BookMetadata"
      data-testid="book-metadata"
    >
      <p
        class="BookTitle"
        data-testid="book-title"
      >
        {{ book.title }}
      </p>

      <p
        class="BookAuthor"
        data-testid="book-author"
      >
        {{ book.author }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Book } from "../../db/schema/books";

defineProps<{
  book: Book;
}>();

</script>

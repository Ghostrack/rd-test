<template>
  <div class="BookLinks">
    <a
      v-for="link in book.links"
      :key="`book-link-${link.name}`"
      :href="link.url"
      class="Link BookLink"
      data-testid="book-store-link"
      target="_blank"
    >
      {{ link.name }}
    </a>
  </div>
</template>

<script setup lang="ts">

import type { Book } from "../../db/schema/books";

defineProps<{
  book: Book;
}>();

</script>

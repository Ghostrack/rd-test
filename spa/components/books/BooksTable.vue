<template>
  <table class="Table">
    <tbody
      class="BooksTable"
      data-testid="books-table"
    >
      <BooksTableColumns />
      <BooksTableRow
        v-for="row in data"
        :key="`books-table-row-${row.id}`"
        :data="row"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">

import type { Book } from "../../db/schema/books";

defineProps<{
  data: Book[];
}>();

</script>

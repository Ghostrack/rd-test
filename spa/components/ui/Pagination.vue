<template>
  <div class="Pagination">
    <button
      data-testid="previous-page-button"
      :disabled="currentPage === 1"
      @click="$emit('pageChange', currentPage - 1)"
    >
      <Icon icon="formkit:arrowleft" />
    </button>

    <p data-testid="pagination-status">
      Page {{ currentPage }} of {{ pageCount }}
    </p>

    <button
      data-testid="next-page-button"
      :disabled="currentPage === pageCount"
      @click="$emit('pageChange', currentPage + 1)"
    >
      <Icon icon="formkit:arrowright" />
    </button>
  </div>
</template>

<script setup lang="ts">

import { Icon } from "@iconify/vue";

defineProps<{
  currentPage: number;
  pageCount  : number;
}>();

defineEmits(["pageChange"]);

</script>

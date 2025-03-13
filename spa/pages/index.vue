<template>
  <div class="HomePage">
    <h2
      class="HomePageTitle"
      data-testid="home-page-title"
    >
      Most Popular Books of All Time
    </h2>

    <BooksTable
      :data="result?.data ?? []"
      data-testid="books-table"
    />

    <UiPagination
      class="BooksTablePagination"
      data-testid="pagination"
      :current-page="page"
      :page-count="pageCount"
      @page-change="(newPage) => page = newPage"
    />
  </div>
</template>

<script setup lang="ts">

useHead({ title: "Reedsy SPA Homepage" });

const route              = useRoute();
const pageQueryParameter = route.query.page?.toString() ?? "1";
const page               = ref(Number.parseInt(pageQueryParameter));

const { data: result } = await useFetch("/api/books", { query: { page } });
const pageCount        = result.value?.pageCount ?? 1;

const handlePageChange = async () => {
  await navigateTo({
    path : "/",
    query: { page: page.value },
  });
};

if (page.value > pageCount) {
  page.value = 1;
  await handlePageChange();
}

watch(page, async () => {
  await handlePageChange();
});

</script>

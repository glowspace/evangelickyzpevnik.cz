<template>
  <div
    class="hidden md:block sticky top-0 flex-grow-0 flex-shrink-0 w-2/5 xl:w-1/3 h-screen overflow-auto border-r border-primary-150"
    v-if="listStore.active == 'search'"
    v-show="$route.name == 'song'"
  >
    <BasicClickable :to="editQueryLink">
      <StickyContainer :onDashboard="false" class="min-h-[81px]">
        <div class="input-box cursor-text">
          <div class="py-2 px-4">{{ listStore.searchString }}</div>
        </div>
        <Filters
          class="p-1 overflow-auto whitespace-nowrap pointer-events-none empty:hidden"
          filter-row-variant="readonly"
          v-model:filters="listStore.filters"
          :show-authors="false"
          v-model:sort="listStore.sort"
          :search-string="listStore.searchString"
        ></Filters>
      </StickyContainer>
    </BasicClickable>
    <SongList
      :search-string="listStore.searchString"
      :filters="listStore.filters"
      :sort="listStore.sort"
      :seed="listStore.seed"
      compact
    ></SongList>
  </div>
</template>

<script setup>
import useListStore from '~/stores/list';
const listStore = useListStore();
import StickyContainer from '~/pages/search/components/StickyContainer';
import Filters from '~/pages/search/components/Filters';
import { toGETParameters } from '~/components/Search/HistoryManager.vue';

const editQueryLink = computed(() => {
  const showSeed = !(listStore.searchString || listStore.sort.by);
  return {
    path: '/',
    query: toGETParameters({
      searchString: listStore.searchString,
      filters: listStore.filters,
      showAuthors: false,
      seed: showSeed ? listStore.seed : null,
      sort: listStore.sort,
    }),
  };
});
</script>

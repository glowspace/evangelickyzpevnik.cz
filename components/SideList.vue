<template>
  <div
    class="hidden md:block sticky top-0 flex-grow-0 w-2/5 xl:w-1/3 h-screen overflow-auto"
    v-if="listStore.active == 'search'"
    v-show="$route.name == 'song'"
  >
    <StickyContainer :onDashboard="false">
      <div class="input-box">
        <div class="py-2 px-4">{{ listStore.searchString }}</div>
      </div>
      <div class="p-1 overflow-auto whitespace-nowrap">
        <Filters
          filter-row-variant="readonly"
          v-model:filters="listStore.filters"
          :show-authors="false"
          v-model:sort="listStore.sort"
          :search-string="listStore.searchString"
        ></Filters>
      </div>
    </StickyContainer>
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
</script>

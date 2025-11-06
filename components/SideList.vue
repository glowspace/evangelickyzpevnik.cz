<template>
  <div
    class="hidden md:block sticky top-0 flex-grow-0 w-2/5 xl:w-1/3 h-screen overflow-auto"
    v-if="listStore.active == 'search'"
    v-show="$route.name == 'song'"
  >
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
</script>

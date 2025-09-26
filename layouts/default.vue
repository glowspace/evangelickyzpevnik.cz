<template>
  <div>
    <Navbar />
    <div class="h-[50vh] overflow-auto" v-if="listStore.active">
      <SongList
        :search-string="listStore.searchString"
        :filters="listStore.filters"
        :sort="listStore.sort"
        :seed="listStore.seed"
      ></SongList>
    </div>
    <slot />
  </div>
</template>

<script setup>
import useListStore from '~/stores/list';
import SongList from '~/components/Song/List';
const listStore = useListStore();
</script>

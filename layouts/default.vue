<template>
  <div>
    <Navbar />
    <div class="h-[50vh] overflow-auto" v-if="listStore.active">
      <SongList
        :search-string="listStore.searchString"
        :selected-tags="listStore.filters.tags"
        :selected-songbooks="listStore.filters.songbooks"
        :selected-languages="listStore.filters.languages"
        :sort="listStore.sort.by"
        :descending="listStore.sort.desc"
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

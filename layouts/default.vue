<template>
  <div>
    <Navbar />
    <div class="h-[50vh] overflow-auto" v-if="listStore.active">
      <SongsList
        :search-string="listStore.searchString"
        :selected-tags="listStore.selectedTags"
        :selected-songbooks="listStore.selectedSongbooks"
        :selected-languages="listStore.selectedLanguages"
        :sort="listStore.sort"
        :descending="listStore.descending"
        :seed="listStore.seed"
      ></SongsList>
    </div>
    <slot />
  </div>
</template>

<script setup>
import useListStore from '~/stores/list';
import SongsList from '~/pages/search/components/SongsList';
const listStore = useListStore();
</script>

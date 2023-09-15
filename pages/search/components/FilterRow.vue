<template>
  <div class="px-4 pb-1">
    <span @click="showFilters = true"
      ><BasicButton iconName="filter_alt" text icon-only icon-fill></BasicButton
    ></span>
    <BottomSheets v-model="showFilters" title="Filtrovat"
      ><slot
    /></BottomSheets>
  </div>
</template>

<script setup>
const showFilters = ref(false);
</script>

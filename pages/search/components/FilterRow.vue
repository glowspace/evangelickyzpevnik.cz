<template>
  <div class="pt-0 p-1">
    <div class="flex flex-row items-stretch">
      <BasicButton icon-name="filter_alt" icon-only icon-fill @click="showFilters = true" class="flex-shrink-0" />
      <div class="flex flex-row items-center overflow-auto whitespace-nowrap">
        <slot name="row" />
        <!-- <BasicChip v-for="filter in ">{{  }}</BasicChip> -->
        <BasicChip class="chip-add hover:!bg-surface-200" @click="showFilters = true"><BasicIcon name="add" class="-mx-1 text-lg" />přidat filtr</BasicChip>
      </div>
    </div>
    <BottomSheets v-model="showFilters" title="Filtrovat">
      <slot />
    </BottomSheets>
  </div>
</template>

<script setup>
const showFilters = ref(false);
</script>

<style lang="postcss" scoped>
.chip-add {
  border: none;
  /* https://kovart.github.io/dashed-border-generator/ */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23333' stroke-width='2' stroke-dasharray='5%2c8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 8px;
}
</style>

<template>
  <div class="pt-0 p-1 md:px-4">
    <div class="flex flex-row items-stretch">
      <!-- desktop button -->
      <BasicButton icon-name="filter_alt" icon-only icon-fill class="flex-shrink-0 !hidden md:!inline-flex pointer-events-none" tabindex="-1" />
      <!-- mobile button -->
      <BasicButton icon-name="filter_alt" icon-only icon-fill class="flex-shrink-0 md:!hidden" @click="showFilters = true" />
      <div class="flex flex-row items-center overflow-auto whitespace-nowrap xl:whitespace-normal">
        <slot name="row" />
        <BasicChip class="chip-add hover:!bg-surface-200 md:!hidden" @click="showFilters = true"><BasicIcon name="add" class="-mx-1 text-lg" />přidat filtr</BasicChip>
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

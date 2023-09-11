<template>
  <button :class="{ 'segmented-item': true, centered }">
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({ centered: Boolean });
</script>

<style lang="postcss" scoped>
.segmented-item {
  @apply [&.active]:bg-primary-150 hover:bg-surface-400 dark:[&.active]:bg-secondary-700 h-10 relative inline-flex flex-row items-center justify-center gap-x-2 py-2.5 pl-4 pr-5 text-sm tracking-[.00714em] font-medium border border-gray-500 dark:border-gray-400 dark:text-primary-200 transition;
  @apply mr-[-1px] overflow-hidden;
}

.segmented-item.centered {
  @apply pl-4 pr-4;
}

.segmented-item[disabled] {
  @apply opacity-60;
}

.segmented-item::after {
  @apply rounded-none;
}

.segmented-item:first-child {
  @apply rounded-l-full;
}

.segmented-item:last-child {
  @apply mr-0 rounded-r-full;
}
</style>

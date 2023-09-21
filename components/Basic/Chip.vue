<template>
  <BasicClickable
    :to="to"
    :href="href"
    class="chip"
  >
    <slot />
  </BasicClickable>
</template>

<script setup>
const props = defineProps({
  href: String,
  to: String,
});
</script>

<style lang="postcss" scoped>
.chip {
  @apply inline-flex flex-row items-center gap-2 h-8 py-1.5 px-3 hover:bg-surface-400 dark:hover:bg-surfacedark-200 border border-gray-500 dark:border-gray-200 rounded-lg text-sm tracking-[.00714em] m-1 [&.active]:bg-primary-150 transition-colors;
}
</style>

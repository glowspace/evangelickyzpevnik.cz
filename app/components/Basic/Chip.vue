<template>
  <BasicClickable :to="to" :href="href" class="chip">
    <slot />
  </BasicClickable>
</template>

<script setup>
const props = defineProps({
  href: [String, Object],
  to: [String, Object],
});
</script>

<style lang="postcss" scoped>
.chip {
  @apply inline-flex flex-row items-center gap-2 h-8 py-1.5 px-3
  border border-gray-500 dark:border-gray-200 rounded-lg text-sm tracking-[.00714em] m-1 transition-colors
  hover:bg-surface-400 [&.active]:bg-primary-150;

  &.tag-blue {
    @apply hover:bg-blue/[.15] [&.active]:bg-blue/30;
  }

  &.tag-green {
    @apply hover:bg-green/[.15] [&.active]:bg-green/30;
  }

  &.tag-red {
    @apply hover:bg-red/[.15] [&.active]:bg-red/30;
  }

  &.tag-yellow {
    @apply hover:bg-yellow/[.15] [&.active]:bg-yellow/30;
  }
}
</style>

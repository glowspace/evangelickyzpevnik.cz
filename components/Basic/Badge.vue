<template>
  <div class="relative">
    <slot />
    <div v-if="small" class="badge badge-a" :class="badgeClass"></div>
    <template v-if="number > 0">
      <div v-if="number < 10" class="badge badge-b" :class="badgeClass">{{ number }}</div>
      <div v-else-if="number < 100" class="badge badge-c" :class="badgeClass">{{ number }}</div>
      <div v-else class="badge badge-c" :class="badgeClass">99+</div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({ small: Boolean, number: Number, badgeClass: String });
// large badge example: <BasicBadge :number="inbox.messages.count"><BasicButton icon-name="mail" /></BasicBadge>
// small badge example: <BasicBadge :small="inbox.contains_unread"><BasicButton icon-name="mail" /></BasicBadge>
</script>

<style lang="postcss" scoped>
.badge {
  @apply absolute pointer-events-none flex items-center justify-center rounded-full text-[11px] leading-none tracking-[.045em]
  font-custom-medium bg-primary dark:bg-error-200 text-white dark:text-error-800;
  /* font-custom-medium bg-error-600 dark:bg-error-200 text-white dark:text-error-800; */
}

.badge-a {
  @apply top-2.5 right-2.5 w-1.5 h-1.5;
}

.badge-b {
  @apply top-0 right-1 w-4 h-4;
}

.badge-c {
  @apply top-0 right-0 min-w-[22px] px-1 h-4;
}
</style>

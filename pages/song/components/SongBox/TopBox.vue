<template>
  <div
    class="w-full rounded-2xl border border-gray-300 dark:border-gray-700 relative overflow-hidden my-2"
    v-show="active"
  >
    <div class="min-h-[56px] flex flex-row items-center gap-3 pl-6 pr-3 py-2">
      <h3 class="flex flex-grow text-base tracking-[.009375em] font-custom-medium">
        {{ title }}
      </h3>
      <BasicButton @click="emit('close')" iconName="close" text icon-only />
    </div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps(['title', 'active']);
const emit = defineEmits(['close']);
</script>

<template>
  <div
    class="w-full h-16 flex flex-row items-center justify-between gap-1.5 bg-surface-200 dark:bg-surfacedark-100 px-1 sticky top-0 z-10 shadow"
  >
    <BasicButton icon-name="arrow_back" icon-only text @click="emit('back')" />
    <component
      :is="isH1 ? 'h1' : 'h2'"
      class="flex flex-grow justify-start text-[1.375rem] leading-7"
    >
      {{ title }}
    </component>
    <div class="flex flex-row justify-end items-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['back']);
const props = defineProps({ title: String, isH1: Boolean });
</script>

<template>
  <div class="top-bar-wrapper">
    <div class="top-bar custom-container">
      <!-- <BasicButton icon-name="arrow_back" icon-only @click="emit('back')" /> -->
      <BasicButton
        icon-type="img"
        icon-name="logo.svg"
        icon-only
        to="/"
      />
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
  </div>
</template>

<script setup>
const emit = defineEmits(['back']);
const props = defineProps({ title: String, isH1: Boolean });
</script>

<style lang="postcss" scoped>
.top-bar-wrapper {
  @apply w-full sticky top-0 z-10 bg-surface-200 dark:bg-surfacedark-100  shadow md:shadow-none md:border-b border-primary-150;
}

.top-bar {
  @apply h-16 md:h-20 flex flex-row items-center justify-between gap-1.5 px-1;
}
</style>

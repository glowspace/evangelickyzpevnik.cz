<template>
  <div v-if="type == 'paragraph'">
    <LoaderSkeleton class="h-4 my-2 w-[85%] max-w-[400px]" />
    <LoaderSkeleton class="h-4 my-2 w-[95%] max-w-[450px]" />
    <LoaderSkeleton class="h-4 my-2 w-[70%] max-w-[300px]" />
  </div>
  <div
    v-else
    :class="[
      { 'h-7 w-[70%] max-w-[250px]': type == 'heading' },
      'bg-gray-300 rounded-md animate-pulse',
    ]"
  ></div>
</template>

<script setup>
const props = defineProps(['type']);
</script>

<style lang="postcss" scoped>
</style>

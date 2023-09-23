<template>
  <div>
    <h2 v-if="title" class="card-header">{{ title }}</h2>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ title: String });
</script>

<style lang="postcss" scoped>
.card-header {
  @apply text-xl font-custom-bold mx-4 my-3;
}

.card-body {
  @apply bg-surface-200 shadow rounded-xl overflow-hidden;

  :slotted(.list-item) {
    @apply flex items-center px-4 py-3 hover:bg-surface-50 border-gray-100;

    &:not(:last-child) {
      @apply border-b;
    }
  }

  :deep(.list-icon),
  :deep(.list-date) {
    @apply inline-block mr-3 text-gray-700;
  }

  :deep(.list-icon) {
    @apply text-center w-7;
  }
}
</style>

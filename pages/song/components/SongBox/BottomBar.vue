<template>
  <div class="bottom-bar-wrapper">
    <div class="bottom-bar custom-container">
      <div class="flex flex-row gap-2 items-center">
        <BasicBadge :small="showToolsBadge"
          ><BasicButton @click="$emit('tools')" icon-name="tune" icon-only
        /></BasicBadge>
        <BasicButton
          :disabled="!mediaAvailable"
          icon-name="headphones"
          icon-fill
          icon-only
          @click="$emit('media')"
        />
        <Fullscreen />
      </div>
      <Autoscroll :scrollable="scrollable" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-bar-wrapper {
  @apply fixed bottom-0 z-10 w-full bg-surface-200 dark:bg-surfacedark-200
  shadow md:shadow-none md:border-t border-primary-150;
}

.bottom-bar {
  @apply flex flex-row justify-between items-center py-3 pl-2 pr-4 gap-2;
}
</style>

<script setup>
import Autoscroll from './Autoscroll';
import Fullscreen from './Fullscreen';
const props = defineProps(['mediaAvailable', 'scrollable', 'showToolsBadge']);
</script>

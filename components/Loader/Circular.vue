<template>
  <div role="status">
    <svg
      :class="[
        'circular-loader',
        'relative',
        'w-' + (size || 5),
        'h-' + (size || 5),
      ]"
      viewBox="0 0 50 50"
    >
      <circle
        class="path stroke-primary dark:stroke-primary-200"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        stroke-miterlimit="10"
      ></circle>
    </svg>
    <span class="sr-only">Načítání…</span>
  </div>
</template>

<script setup>
const props = defineProps(['size']);
</script>

<style lang="postcss" scoped>
.circular-loader {
  animation: rotate 2s linear infinite;
  z-index: -1;
}
.circular-loader .path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>

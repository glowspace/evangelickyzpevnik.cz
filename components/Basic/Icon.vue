<template>
  <span class="material-symbols-outlined" :class="{ 'icon-fill': fill }">
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  fill: Boolean,
});
</script>

<style lang="postcss" scoped>
.icon-fill {
  font-variation-settings: 'FILL' 1;
}
</style>

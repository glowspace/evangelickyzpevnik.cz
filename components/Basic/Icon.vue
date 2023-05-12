<template>
  <i v-if="fa" :class="fa"></i>
  <span
    v-else
    class="material-symbols-outlined"
    :class="[{ 'icon-fill': fill }, props.class]"
  >
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  fill: Boolean,
  fa: String,
  class: String,
});
</script>

<style lang="postcss" scoped>
.icon-fill {
  font-variation-settings: 'FILL' 1;
}
</style>

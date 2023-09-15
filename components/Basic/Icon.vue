<template>
  <i v-if="type == 'fa'" :class="name"></i>
  <span
    v-else
    class="material-symbols-outlined"
    :class="[{ 'icon-fill': fill }, props.class]"
  >
    {{ name }}
  </span>
</template>

<script setup>
const props = defineProps({
  fill: Boolean,
  fa: String,
  class: String,
  name: String,
  type: String,
});
</script>

<style lang="postcss" scoped>
.icon-fill {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 30;
}
</style>

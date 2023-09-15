<template>
  <i v-if="type == 'fa'" :class="[name, 'text-xl -mt-px']"></i>
  <span
    v-else
    class="material-symbols-outlined"
    :class="{ 'icon-fill': fill }"
  >
    {{ name }}
  </span>
</template>

<script setup>
const props = defineProps({
  fill: Boolean,
  fa: String,
  name: String,
  type: String,
});
</script>

<style lang="postcss">
.icon-fill {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 30;
}

.fab {
  @apply font-normal;
}
</style>

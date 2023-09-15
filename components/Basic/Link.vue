<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    @click="clicked"
    class="link"
  >
    <slot />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
  eventId: String,
  href: String,
  to: String,
});

function clicked() {
  // here we can do some logging (with eventId)
}
</script>

<style lang="postcss" scoped>
.link {
  @apply underline hover:no-underline;
}
</style>

<template>
  <BasicClickable
    :is="to ? NuxtLink : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :event-id="eventId"
    class="link"
  >
    <slot />
  </BasicClickable>
</template>

<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
  eventId: String,
  href: String,
  to: String,
});
</script>

<style lang="postcss" scoped>
.link {
  @apply hover:underline no-underline;
}
</style>

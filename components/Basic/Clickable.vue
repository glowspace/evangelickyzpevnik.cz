<template>
  <component
    :is="(to || href) ? NuxtLink : 'button'"
    :to="to"
    :href="href"
    :target="target"
    @click="clicked"
  ><slot /></component>
</template>

<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
  eventId: String,
  href: [String, Object],
  to: [String, Object],
  target: String,
});

function clicked() {
  // here we can do some logging (with eventId)
}
</script>

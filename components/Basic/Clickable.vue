<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'button'"
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
  href: String,
  to: String,
  target: String,
});

function clicked() {
  // here we can do some logging (with eventId)
}
</script>

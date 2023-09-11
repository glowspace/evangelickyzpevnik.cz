<template>
  <div class="sticky top-0 pt-1" :class="{ 'bg-primary-100 shadow': !onDashboard }">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps(['onDashboard']);
</script>

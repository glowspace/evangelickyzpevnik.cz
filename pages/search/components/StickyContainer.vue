<template>
  <div class="sticky top-0 pt-1" :class="{ 'bg-primary-100 shadow md:shadow-none md:border-b border-primary-150': !onDashboard }">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps(['onDashboard']);
</script>

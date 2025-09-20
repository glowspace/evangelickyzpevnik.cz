<template>
  <span></span>
</template>

<script setup>
const props = defineProps(['error']);
const { variation, titleSeparator } = useRuntimeConfig()?.public;

useHead(
  generateHead(
    'Chyba ' + props.error.statusCode + titleSeparator + variation.title,
    ''
  )
);
</script>

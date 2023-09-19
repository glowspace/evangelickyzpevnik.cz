<script setup>
const props = defineProps(['error']);
const { siteName, titleSeparator } = useRuntimeConfig()?.public;

useHead(
  generateHead(
    'Chyba ' + props.error.statusCode + titleSeparator + siteName,
    ''
  )
);
</script>

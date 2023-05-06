<template>
  <nuxt-link v-if="to" :to="to" class="btn"><slot /></nuxt-link>
  <a v-else-if="href" :href="href" class="btn"><slot /></a>
  <button v-else @click="clicked" class="btn"><slot /></button>
</template>

<script setup>
const props = defineProps(['eventId', 'href', 'to']);

function clicked() {
  // here we can do some logging
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25rem]
  text-sm tracking-[.00714em] font-medium bg-primary text-white
  hover:opacity-90 hover:shadow-md
  transition
  dark:bg-primary-200 dark:text-primary-800;
}
</style>

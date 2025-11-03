<template>
  <h3 v-if="title">{{ title }}</h3>
  <div class="member-list">
    <div v-for="{ name, role } in members" class="member">
      <p class="my-2">
        {{ name }}<br /><span class="text-gray">{{ role }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  members: Array,
});
</script>

<style lang="postcss" scoped></style>

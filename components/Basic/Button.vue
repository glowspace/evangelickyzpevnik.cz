<template>
  <component
    :is="to ? 'nuxt-link' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    @click="clicked"
    :class="['btn', btnType, props.class]"
  >
    <BasicIcon v-if="icon" :fill="iconFill">{{ icon }}</BasicIcon>
    <slot />
  </component>
</template>

<script setup>
// const props = defineProps(['eventId', 'href', 'to', 'icon', 'text', 'class']);
const props = defineProps({
  eventId: String,
  href: String,
  to: String,
  icon: String,
  class: String,
  text: Boolean,
  iconFill: Boolean,
});

function clicked() {
  // here we can do some logging
}

const btnType = computed(() => {
  if (props.text) {
    return 'text';
  } else {
    return 'primary';
  }
});
</script>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25rem]
  text-sm tracking-[.00714em] font-medium transition;
}

.btn.primary {
  @apply bg-primary text-white
  hover:opacity-90 hover:shadow-md
  dark:bg-primary-200 dark:text-primary-800;
}

.btn.text {
  @apply hover:bg-surface-200
  dark:text-primary-200 dark:hover:bg-surfacedark-200;
}
</style>

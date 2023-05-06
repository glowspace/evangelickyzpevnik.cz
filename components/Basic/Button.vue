<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    @click="clicked"
    :class="[
      'btn',
      btnType,
      {
        'icon-only': iconOnly,
        /*'!pr-8': icon*/
        compact,
      },
      props.class,
    ]"
  >
    <BasicIcon v-if="icon" :fill="iconFill">{{ icon }}</BasicIcon>
    <slot />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components';
// const props = defineProps(['eventId', 'href', 'to', 'icon', 'text', 'class']);
const props = defineProps({
  eventId: String,
  href: String,
  to: String,
  icon: String,
  class: String,
  text: Boolean,
  iconFill: Boolean,
  compact: Boolean,
  iconOnly: Boolean,
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
  @apply hover:bg-primary/10
  dark:text-primary-200 dark:hover:bg-surfacedark-200;
}

.icon-only {
  @apply !inline-flex !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium dark:text-primary-200;
  @apply hover:bg-primary/10 focus:bg-primary/10 dark:hover:bg-surfacedark-300 dark:focus:bg-surfacedark-400;
}

.compact {
  @apply w-8 h-8 p-1;
}
</style>

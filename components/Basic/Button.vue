<template>
  <BasicClickable
    :to="to"
    :href="href"
    :event-id="eventId"
    :disabled="disabled"
    :class="[
      'btn',
      btnType,
      {
        'icon-only': iconOnly,
        /*'!pr-8': icon*/
        'with-icon': !!iconName && !iconOnly,
        compact,
      },
    ]"
  >
    <BasicIcon
      v-if="iconName"
      :name="iconName"
      :type="iconType"
      :fill="iconFill"
    />
    <slot />
  </BasicClickable>
</template>

<script setup>
const props = defineProps({
  eventId: String,
  href: String,
  to: String,
  type: String,
  compact: Boolean,
  disabled: Boolean,
  iconName: String,
  iconFill: Boolean,
  iconOnly: Boolean,
  iconType: String,
});

const btnType = computed(() => {
  return props.type || 'text';
});
</script>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25rem]
  text-sm tracking-[.00714em] font-custom-medium transition;
}

.btn.primary {
  @apply bg-primary text-white
  hover:opacity-90 hover:shadow-md
  dark:bg-primary-200 dark:text-primary-800;
}

.btn.text,
.btn.outlined {
  @apply hover:bg-primary/10
  dark:text-primary-200 dark:hover:bg-surfacedark-200;
}

.btn.outlined {
  @apply border border-gray-400 text-primary;
}

.btn:disabled {
  @apply pointer-events-none opacity-30;
}

.icon-only {
  @apply w-12 h-12 gap-x-2 p-0 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-custom-medium dark:text-primary-200;
  @apply hover:bg-primary/10 focus:bg-primary/10 dark:hover:bg-surfacedark-300 dark:focus:bg-surfacedark-400;
}

.with-icon {
  @apply pr-7;
}

.compact {
  @apply w-8 h-8 p-1;
}
</style>

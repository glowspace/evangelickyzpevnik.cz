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
        'mobile-icon-only': mobileIconOnly,
        /*'!pr-8': icon*/
        'with-icon': !!iconName && !iconOnly && !mobileIconOnly,
        compact,
      },
    ]"
  >
    <BasicIcon
      v-if="iconName"
      :name="iconName"
      :type="iconType"
      :fill="iconFill"
      class="icon"
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
  mobileIconOnly: Boolean, // when using this, icon label has to be inside another tag in order to be hidden
  iconType: String,
});

const btnType = computed(() => {
  return props.type || 'text';
});
</script>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex flex-row items-center justify-center gap-x-2 py-2.5 px-5 rounded-[6.25rem]
  text-sm tracking-[.00714em] font-custom-medium transition;
}

.btn.primary {
  @apply bg-primary text-white
  hover:opacity-90 hover:shadow-md
  dark:bg-primary-200 dark:text-primary-800;
}

.btn.text,
.btn.outlined {
  @apply hover:bg-primary/10 focus:bg-primary/10
  dark:text-primary-200 dark:hover:bg-surfacedark-200 dark:focus:bg-surfacedark-400;
}

.btn.nohover {
  @apply hover:bg-transparent focus:bg-transparent cursor-default
}

.btn.outlined {
  @apply border border-gray-400 text-primary;
}

.btn:disabled {
  @apply pointer-events-none opacity-30;
}

.icon-only,
.mobile-icon-only {
  @apply w-12 h-12 p-0 rounded-[6.25rem];

  &.compact {
    @apply w-8 h-8 p-1;
  }
}

.with-icon {
  @apply pr-6;
}

.mobile-icon-only > :not(.icon) {
  @apply hidden md:block;
}

@media screen(md) {
  .mobile-icon-only {
    @apply w-auto h-auto py-2.5 pl-5 pr-6;
  }
}
</style>

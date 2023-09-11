<template>
  <!-- side sheets dialog -->
  <div class="group" :class="{ show }">
    <!-- background sheets dialogs -->
    <div
      @click="show = false"
      class="background group-[&.show]:opacity-20 dark:group-[&.show]:opacity-20 inset-0 fixed z-40 opacity-0 -top-full bg-neutral-900"
    ></div>
    <!-- side sheets dialogs -->
    <div
      class="sheet group-[&.show]:translate-y-0 fixed left-0 bottom-0 right-0 z-50 h-2/3 translate-y-full flex flex-col gap-2"
    >
      <div
        class="bottom-sheets-container bg-surface-100 dark:bg-surfacedark-100 rounded-t-2xl h-full w-full flex flex-col overflow-hidden"
      >
        <!-- header -->
        <div
          class="min-h-[56px] flex flex-row items-center gap-3 pl-6 pr-3 pb-2 pt-2.5 flex-shrink-0 shadow bg-surface-300"
        >
          <h3 class="flex flex-grow text-base tracking-[.009375em] font-medium">
            {{ title }}
          </h3>
          <BasicButton @click="show = false" icon="close" text icon-only />
        </div>
        <!-- body -->
        <div class="relative text-left px-6 py-6 overflow-y-scroll">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'modelValue']);
const emit = defineEmits(['update:modelValue']);
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="postcss" scoped>
.sheet {
  max-height: 60%;
}

.background,
.sheet {
  visibility: hidden;
  transition: opacity theme(transitionDuration.DEFAULT),
    transform cubic-bezier(0.4, 0, 0.2, 1) 400ms,
    visibility 0s linear theme(transitionDuration.DEFAULT);
}

.show {
  .background,
  .sheet {
    visibility: visible;
    transition: opacity theme(transitionDuration.DEFAULT),
      transform cubic-bezier(0.4, 0, 0.2, 1) 400ms, visibility 0s linear;
  }
}
</style>

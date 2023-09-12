<template>
  <div
    class="flex flex-row items-center justify-between h-14 rounded-full bg-surface-100 dark:bg-surfacedark-100 p-2 m-2 border border-gray-500"
  >
    <div class="flex flex-row items-center flex-grow">
      <span class="button" v-if="onDashboard">
        <span class="icon material-symbols-outlined">search</span>
      </span>
      <button class="button clickable" v-else @click="emit('back')">
        <span class="icon material-symbols-outlined">arrow_back</span>
      </button>
      <input
        type="search"
        placeholder="Hledat píseň podle názvu, čísla nebo textu…"
        class="bg-transparent py-2 pl-1 pr-4 ring-0 focus:outline-none grow"
        v-model="value"
        @keyup.enter="emit('enter')"
        @focus="emit('focus')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'onDashboard']);
const emit = defineEmits(['update:modelValue', 'enter', 'back', 'focus']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="postcss" scoped>
.button {
  @apply relative !inline-flex !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-custom-medium dark:text-primary-200;
}

.clickable {
  @apply hover:bg-surface-300 focus:bg-surface-400 dark:hover:bg-surfacedark-300 dark:focus:bg-surfacedark-400;
}

.icon {
  @apply !text-2xl;
}
</style>

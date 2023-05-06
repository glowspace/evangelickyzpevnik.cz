<template>
  <div
    class="flex flex-row items-center justify-between w-full h-14 rounded-full bg-surface-100 dark:bg-surfacedark-100 p-2"
  >
    <div class="flex flex-row items-center flex-grow">
      <span
        class="material-symbols-outlined relative !inline-flex !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 text-sm tracking-[.00714em] text-center font-medium dark:text-primary-200"
      >
        <span class="material-symbols-outlined !text-2xl">search</span>
      </span>
      <input
        type="search"
        placeholder="Hledat píseň podle názvu, čísla nebo textu…"
        class="w-full bg-transparent py-2 px-4 ring-0 focus:outline-none"
        v-model="value"
        @keyup.enter="emit('enter')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'enter']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <div
    class="flex flex-row items-center justify-between h-14 rounded-full bg-surface-100 dark:bg-surfacedark-100 p-2 m-2 border border-gray-500"
    @click="focusInput"
  >
    <div class="flex flex-row items-center flex-grow">
      <BasicButton
        v-if="onDashboard"
        icon-name="search"
        icon-only
        class="pointer-events-none"
      />
      <BasicButton
        v-else
        icon-name="arrow_back"
        icon-only
        @click="emit('back')"
      />
      <input
        type="search"
        :placeholder="searchSongs ? 'Hledat píseň podle názvu, čísla nebo textu…' : 'Hledat autora podle jména'"
        class="bg-transparent py-2 pl-1 pr-4 ring-0 focus:outline-none grow"
        v-model="value"
        @keyup.enter="emit('enter')"
        @focus="emit('focus')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'onDashboard', 'searchSongs']);
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

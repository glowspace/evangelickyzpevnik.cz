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
        class="nohover"
        tabindex="-1"
      />
      <BasicButton
        v-else
        icon-name="arrow_back"
        icon-only
        @click="emit('back')"
      />
      <input
        type="search"
        :placeholder="
          searchSongs
            ? 'Hledat píseň podle názvu, čísla nebo textu…'
            : 'Hledat autora podle jména'
        "
        class="bg-transparent py-2 px-1 ring-0 focus:outline-none grow"
        :class="{ 'pr-4': value == '' }"
        v-model="value"
        @keyup.enter="emit('enter')"
        ref="searchInput"
      />
      <BasicButton
        v-if="!onDashboard && value != ''"
        icon-name="close"
        icon-only
        @click="
          value = '';
          searchInput.focus();
        "
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'onDashboard', 'searchSongs']);
const emit = defineEmits(['update:modelValue', 'enter', 'back']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const searchInput = ref(null);

watch(
  () => props.onDashboard,
  (value) => {
    if (!value) {
      searchInput.value.focus();
    }
  }
);

onMounted(() => {
  if (!props.onDashboard) {
    searchInput.value.focus();
  }
});
</script>

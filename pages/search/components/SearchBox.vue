<template>
  <div
    class="flex flex-row items-center justify-between input-box"
  >
    <div class="flex flex-row items-center flex-grow">
      <BasicButton
        v-if="onDashboard"
        icon-name="search"
        icon-only
        class="nohover"
        tabindex="-1"
        @click="emit('clickBox')"
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
        :class="{ 'pr-4': showCross }"
        v-model="valueModel"
        @keyup.enter="emit('enter')"
        ref="searchInput"
        @click="emit('clickBox')"
      />
      <LoaderCircular v-if="songLoading" size="6" class="mx-3" />
      <BasicButton
        v-else-if="showCross"
        icon-name="close"
        icon-only
        @click="
          emit('update:modelValue', '');
          searchInput.focus();
        "
      />
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash-es';

const props = defineProps([
  'modelValue',
  'onDashboard',
  'searchSongs',
  'songLoading',
]);
const emit = defineEmits(['update:modelValue', 'enter', 'back', 'clickBox']);
const debouncedValueEmit = debounce((value) => {
  emit('update:modelValue', value);
}, 500);

const searchInput = ref(null);

const valueModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    debouncedValueEmit(val);
  },
});
const showCross = computed(
  () => !props.onDashboard && props.modelValue != ''
);

watch(
  () => props.onDashboard,
  (val) => {
    if (!val) {
      searchInput.value.focus();
    }
  }
);

onMounted(() => {
  if (!props.onDashboard) {
    searchInput.value.focus();
  }
});

onUnmounted(() => {
  debouncedValueEmit.cancel();
});
</script>

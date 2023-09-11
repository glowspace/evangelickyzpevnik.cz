<template>
  <div class="toggle-switch relative inline-flex w-[52px] h-8">
    <input
      :id="id"
      class="toggle-checkbox appearance-none"
      type="checkbox"
      v-model="checked"
    />
    <label
      :for="id"
      class="toggle-icon relative block w-12 h-8 rounded-full transition-color duration-150 ease-out cursor-pointer"
    ></label>
  </div>
</template>

<script setup>
const input = ref(null);
const props = defineProps(['id', 'modelValue']);
const emit = defineEmits(['update:modelValue']);
const checked = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="postcss" scoped>
.toggle-icon:before {
  @apply absolute block w-5 h-5 bg-gray-500 bg-center bg-no-repeat rounded-full transition-transform duration-150 ease-out translate-x-0.5 translate-y-0.5 shadow;
  transition-property: transform, height, width, background-color;
  top: 0.1rem;
  left: 0.1rem;
  content: '';
}
.toggle-switch:hover .toggle-icon:before {
  @apply ring-8 ring-primary-200 dark:ring-primary-600 ring-opacity-30 dark:ring-opacity-30;
}
.toggle-checkbox:checked + .toggle-icon:before {
  @apply translate-x-4 translate-y-0 bg-white dark:bg-primary-600;
  background-size: 70%;
}
/* .toggle-icon:before {
  background-size: 40%;
  background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"%3E%3Cline x1="18" y1="6" x2="6" y2="18"%3E%3C/line%3E%3Cline x1="6" y1="6" x2="18" y2="18"%3E%3C/line%3E%3C/svg%3E');
} */
.toggle-checkbox:checked + .toggle-icon:before {
  @apply w-6 h-6;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='%2321005D' class='bi bi-check-lg' viewBox='0 0 16 16'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");
}
/* .dark .toggle-icon:before {
  background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2349454F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"%3E%3Cline x1="18" y1="6" x2="6" y2="18"%3E%3C/line%3E%3Cline x1="6" y1="6" x2="18" y2="18"%3E%3C/line%3E%3C/svg%3E');
} */
.dark .toggle-checkbox:checked + .toggle-icon:before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='%23E7E0EC' class='bi bi-check-lg' viewBox='0 0 16 16'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");
}
.toggle-switch .toggle-icon {
  @apply bg-gray-100 border-2 border-gray-500 dark:bg-gray-700;
}
.toggle-switch .toggle-checkbox:checked + .toggle-icon {
  @apply bg-primary-600 border-2 border-primary-600 dark:bg-primary-200 dark:border-primary-200;
}
.toggle-checkbox:focus-visible {
  outline: none;

  & + .toggle-icon {
    outline: auto;
  }
}
</style>

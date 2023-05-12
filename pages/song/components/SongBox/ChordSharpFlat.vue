<template>
  <div>
    <div>Posuvky</div>
    <div class="btn-group m-0 bg-light" role="group">
      <a
        class="btn btn-secondary"
        :class="{ chosen: !useFlatScale }"
        @click="useFlatScale = false"
        >#</a
      >
      <a
        class="btn btn-secondary"
        :class="{ chosen: useFlatScale }"
        @click="useFlatScale = true"
        >♭</a
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const useFlatScale = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

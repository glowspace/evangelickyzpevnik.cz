<template>
  <div>
    <div>Transpozice</div>
    <div class="btn-group m-0" role="group">
      <a class="btn btn-secondary" @click="transpose(-1)">-</a>
      <a class="btn btn-secondary bg-light transpose-window" @click="reset()">{{
        value
      }}</a>
      <a class="btn btn-secondary" @click="transpose(1)">+</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function transpose(x) {
  value.value = (value.value + x) % 12;
}

function reset() {
  value.value = 0;
}
</script>

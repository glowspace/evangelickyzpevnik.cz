<template>
  <div>
    <div>Transpozice</div>
    <BasicButtonGroup class="mb-4">
      <BasicButtonGroupItem centered @click="transpose(-1)">
        <BasicIcon>remove</BasicIcon>
      </BasicButtonGroupItem>
      <BasicButtonGroupItem centered @click="reset()" class="w-14">
        {{ value.toString().replace('-', '&minus;') }}
      </BasicButtonGroupItem>
      <BasicButtonGroupItem centered @click="transpose(1)">
        <BasicIcon>add</BasicIcon>
      </BasicButtonGroupItem>
    </BasicButtonGroup>
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

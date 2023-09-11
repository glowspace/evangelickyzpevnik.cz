<template>
  <ToolboxContainer>
    <div>Transpozice</div>
    <BasicButtonGroup>
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
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';

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

<template>
  <ToolboxContainer>
    <div @click="simpleView = !simpleView">Zjednodušit zobrazení</div>
    <BasicSwitch v-model="simpleView" id="simpleview-switch" />
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const simpleView = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

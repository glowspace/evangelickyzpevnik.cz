<template>
  <ToolboxContainer>
    <div @click="showChords = !showChords">Zobrazit akordy</div>
    <BasicSwitch v-model="showChords" id="chordmode-switch" />
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const showChords = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

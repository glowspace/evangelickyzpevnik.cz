<template>
  <ToolboxContainer>
    <div>Posuvky</div>
    <BasicButtonGroup>
      <BasicButtonGroupItem centered @click="useFlatScale = false" :class="{ active: !useFlatScale }">
        <span class="text-lg w-8">#</span>
      </BasicButtonGroupItem>
      <BasicButtonGroupItem centered @click="useFlatScale = true" :class="{ active: useFlatScale }">
        <span class="text-lg w-8">♭</span>
      </BasicButtonGroupItem>
    </BasicButtonGroup>
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';

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

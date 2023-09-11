<template>
  <ToolboxContainer>
    <div>Blokovat zhasínání displeje</div>
    <BasicSwitch id="nosleep-switch" v-model="nsComp" />
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';

import NoSleep from 'nosleep.js';
const nsRef = ref(false);
const nsObject = ref(null);

if (process.client) {
  nsObject.value = new NoSleep();
}

const nsComp = computed({
  get() {
    return nsRef.value;
  },
  set(value) {
    nsRef.value = value;

    if (value) {
      nsObject.value.enable();
    } else {
      nsObject.value.disable();
    }
  },
});
</script>

<style lang="postcss" scoped></style>

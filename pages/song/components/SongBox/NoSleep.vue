<template>
  <ToolboxContainer>
    <div @click="noSleepActive = !noSleepActive">
      Blokovat zhasínání displeje
    </div>
    <BasicSwitch id="nosleep-switch" v-model="noSleepActive" />
  </ToolboxContainer>
</template>

<script setup>
import ToolboxContainer from './ToolboxContainer.vue';
import NoSleep from 'nosleep.js';
import useChordStore from '~/stores/homepage';

const store = useChordStore();

if (process.client && store.noSleep == null) {
  store.noSleep = new NoSleep();
}

const noSleepActive = computed({
  get() {
    return store.noSleep?.enabled;
  },
  set(value) {
    if (value) {
      store.noSleep.enable();
    } else {
      store.noSleep.disable();
    }
  },
});
</script>

<style lang="postcss" scoped></style>

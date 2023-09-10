<template>
  <a
    class="btn btn-secondary nosleep"
    :title="[
      !nosleep
        ? 'Blokovat zhasínání displeje'
        : 'Přestat blokovat zhasínání displeje',
    ]"
    @click="toggleNosleep"
    ><i class="fa-sun" :class="[nosleep ? 'far' : 'fas']"></i
  ></a>
  <a class="btn btn-secondary nosleep-caption" @click="toggleNosleep">{{
    !nosleep
      ? 'zhasínání&nbsp;displeje není&nbsp;blokováno'
      : 'zhasínání&nbsp;displeje je&nbsp;blokováno'
  }}</a>
</template>

<script setup>
import NoSleep from 'nosleep.js';
const nosleep = ref(false);
const noSleeper = ref(null);

if (process.client) {
  noSleeper.value = new NoSleep();
}

function toggleNosleep() {
  nosleep.value = !nosleep.value;

  if (nosleep.value) {
    noSleeper.value.enable();
  } else {
    noSleeper.value.disable();
  }
}
</script>

<style lang="postcss" scoped></style>

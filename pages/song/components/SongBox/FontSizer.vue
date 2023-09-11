<template>
  <div>
    <div>Velikost písma</div>
    <BasicButtonGroup class="mr-2 mb-2">
      <BasicButtonGroupItem centered @click="fontSizePercent -= 10">
        <BasicIcon>remove</BasicIcon>
      </BasicButtonGroupItem>
      <BasicButtonGroupItem centered @click="fontSizePercent = 100" class="w-14">
        {{ ((fontSizePercent - 100) / 10).toString().replace('-', '&minus;') }}
      </BasicButtonGroupItem>
      <BasicButtonGroupItem centered @click="fontSizePercent += 10">
        <BasicIcon>add</BasicIcon>
      </BasicButtonGroupItem>
    </BasicButtonGroup>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const refreshHandler = ref(null);

const fontSizePercent = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    let sl = process.client ? document.getElementById('song-lyrics') : null;

    if (!sl.style.height) {
      sl.style.height = sl.clientHeight + 'px';
    }

    if (refreshHandler.value) {
      clearTimeout(refreshHandler.value);
    }

    // prevent screen jumping
    refreshHandler.value = setTimeout(() => {
      sl.style.height = null;
    }, 1000);

    if (value > 70) {
      emit('update:modelValue', value);
    }
  },
});
</script>

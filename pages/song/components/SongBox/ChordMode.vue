<template>
  <div>
    <div>Akordy</div>
    <div class="btn-group m-0 bg-light" role="group">
      <a
        class="btn btn-secondary"
        :class="{ chosen: chordMode === 0 }"
        @click="chordMode = 0"
        ><i class="far fa-eye-slash"></i
      ></a>
      <a
        class="btn btn-secondary"
        :class="{ chosen: chordMode === 2 }"
        @click="chordMode = 2"
        ><i class="far fa-eye"></i
      ></a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const chordMode = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <div>
    <div>Velikost písma</div>
    <div class="btn-group m-0" role="group">
      <a class="btn btn-secondary" @click="fontSizePercent -= 10">-</a>
      <a
        class="btn btn-secondary bg-light transpose-window"
        @click="fontSizePercent = 100"
        >{{ (fontSizePercent - 100) / 10 }}</a
      >
      <a class="btn btn-secondary" @click="fontSizePercent += 10">+</a>
    </div>
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

    refreshHandler.value = setTimeout(() => {
      sl.style.height = null;
    }, 1000);

    if (value > 70) {
      emit('update:modelValue', value);
    }
  },
});
</script>

<!-- <script>
export default {
  props: ['value'],

  data() {
    return {
      sl_refresh_handler: null,
    };
  },

  methods: {
    setFontSizePercent: function (val) {
      let sl = process.client ? document.getElementById('song-lyrics') : null;

      if (!sl.style.height) {
        sl.style.height = sl.clientHeight + 'px';
      }

      if (this.sl_refresh_handler) {
        clearTimeout(this.sl_refresh_handler);
      }

      this.sl_refresh_handler = setTimeout(() => {
        sl.style.height = null;
      }, 1000);

      if (val > 70) {
        this.$emit('input', val);
      }
    },
  },
};
</script> -->

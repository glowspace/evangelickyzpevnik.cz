<template>
  <div class="flex flex-row items-center gap-3">
    <BasicButton
      icon-name="remove"
      icon-only
      compact
      v-if="autoscroll"
      @click="autoscrollNum--"
      :disabled="autoscrollNum == 1"
    />
    <BasicButton
      icon-name="add"
      icon-only
      compact
      v-if="autoscroll"
      @click="autoscrollNum++"
      :disabled="autoscrollNum == 20"
    />
    <button
      class="flex justify-center items-center w-14 h-14 rounded-2xl ml-1 bg-primary-150 dark:bg-primary-700 hover:bg-primary-200"
      @click="autoscroll = !autoscroll"
      :disabled="!scrollable"
    >
      <BasicIcon :name="autoscroll ? 'stop' : 'arrow_downward'" fill />
    </button>
  </div>
</template>

<script>
export default {
  props: ['scrollable'],

  data() {
    return {
      autoscroll: false,
      autoscrollNum: 10,
      autoScroller: null,
      heightChecker: null,
    };
  },

  watch: {
    autoscroll: function () {
      this.setScroll(this.autoscrollNum, this.autoscroll);
    },
    autoscrollNum: function () {
      this.setScroll(this.autoscrollNum, this.autoscroll);
    },
  },

  destroyed() {
    this.setScroll(this.autoscrollNum, false);
  },

  methods: {
    setScroll: function (num, condition) {
      clearInterval(this.autoScroller);
      clearInterval(this.heightChecker);

      if (process.client && num > 0 && num < 21 && condition) {
        this.autoScroller = setInterval(function () {
          window.scrollBy(0, 1);
        }, (21 - num) * 10);

        this.heightChecker = setInterval(
          function () {
            if (
              window.innerHeight + window.scrollY >=
              document.body.scrollHeight
            ) {
              // we're at the bottom of the page
              this.autoscroll = false;
            }
          }.bind(this),
          2000
        );
      }
    },

    keyUp: function (e) {
      if (e.key == '+') {
        if (this.autoscroll && this.autoscrollNum < 20) {
          this.autoscrollNum++;
        }
        this.autoscroll = true;
      } else if (e.key == 'Escape') {
        this.autoscroll = false;
      } else if (e.key == '-' && this.autoscrollNum > 1) {
        this.autoscrollNum--;
      }
    },
  },

  mounted() {
    window.addEventListener('keyup', this.keyUp);
  },
};
</script>

<style lang="postcss" scoped>
button:disabled {
  @apply pointer-events-none opacity-80 bg-gray-100 text-gray-600;
}
</style>

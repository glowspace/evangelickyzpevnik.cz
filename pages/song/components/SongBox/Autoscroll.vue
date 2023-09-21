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
    <BasicClickable
      class="floating-action-button"
      @click="autoscroll = !autoscroll"
      :disabled="!scrollable"
    >
      <BasicIcon :name="autoscroll ? 'stop' : 'arrow_downward'" fill />
      <span class="hidden md:block">Rolovat</span>
    </BasicClickable>
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
.floating-action-button {
  @apply flex justify-center items-center p-4 rounded-2xl ml-1
  text-sm gap-x-2 md:pr-5 font-custom-medium
  bg-primary-150 dark:bg-primary-700 hover:bg-primary-200;
}

.floating-action-button:disabled {
  @apply pointer-events-none opacity-80 bg-gray-100 text-gray-600;
}
</style>

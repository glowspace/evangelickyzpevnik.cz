<template>
  <div class="bottom-bar-wrapper">
    <div class="flex flex-row gap-2 items-center">
      <BasicButton icon-name="tune" icon-only text @click="$emit('tools')" />
      <BasicButton v-if="mediaAvailable" icon-name="headphones" icon-fill icon-only text @click="$emit('media')" />
      <BasicButton
        :icon-name="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        icon-only
        text
        @click="toggleFullscreen"
      />
    </div>
    <button
      class="flex justify-center items-center w-14 h-14 rounded-2xl bg-primary-150 dark:bg-primary-700 hover:shadow-md"
    >
      <BasicIcon name="arrow_downward" />
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-bar-wrapper {
  @apply fixed bottom-0 flex z-10 flex-row justify-between items-center py-3 pl-2 pr-4 gap-2 w-full md:w-[412px] bg-surface-200 dark:bg-surfacedark-200;
}
</style>

<script>
export default {
  props: ['mediaAvailable'],

  data() {
    return {
      fullscreen: false,
    };
  },

  methods: {
    toggleFullscreen() {
      if (process.client) {
        var element = document.documentElement;
        var isFullscreen =
          document.webkitIsFullScreen || document.mozFullScreen || false;
        element.requestFullScreen =
          element.requestFullScreen ||
          element.webkitRequestFullScreen ||
          element.mozRequestFullScreen ||
          function () {
            return false;
          };
        document.cancelFullScreen =
          document.cancelFullScreen ||
          document.webkitCancelFullScreen ||
          document.mozCancelFullScreen ||
          function () {
            return false;
          };

        if (isFullscreen) {
          document.cancelFullScreen();
        } else {
          element.requestFullScreen();
        }
      }
    },

    fullscreenChanged() {
      if (process.client) {
        this.fullscreen =
          document.webkitIsFullScreen || document.mozFullScreen || false;
      }
    },
  },

  mounted() {
    if (process.client) {
      document.addEventListener('fullscreenchange', this.fullscreenChanged);
      document.addEventListener('mozfullscreenchange', this.fullscreenChanged);
      document.addEventListener(
        'webkitfullscreenchange',
        this.fullscreenChanged
      );
      document.addEventListener('msfullscreenchange', this.fullscreenChanged);
      this.fullscreenChanged();
    }
  },
};
</script>

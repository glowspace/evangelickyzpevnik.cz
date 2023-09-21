<template>
  <BasicButton
    :icon-name="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
    mobile-icon-only
    @click="toggleFullscreen"
  >
    <span>Celá obrazovka</span>
  </BasicButton>
</template>

<script>
export default {
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

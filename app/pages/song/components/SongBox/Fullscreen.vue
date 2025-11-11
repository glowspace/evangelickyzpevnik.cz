<template>
  <BasicButton
    :icon-name="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
    mobile-icon-only
    @click="toggleFullscreen"
  >
    <span>Celá obrazovka</span>
  </BasicButton>
</template>

<script setup>
const fullscreen = ref(false);

function isFullscreen() {
  return (
    document.fullscreenElement != null ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    false
  );
}

function toggleFullscreen() {
  var element = document.documentElement;
  element.requestFullScreen =
    element.requestFullScreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    (() => false);
  document.cancelFullScreen =
    document.cancelFullScreen ||
    document.webkitCancelFullScreen ||
    document.mozCancelFullScreen ||
    (() => false);

  if (isFullscreen()) {
    document.cancelFullScreen();
  } else {
    element.requestFullScreen();
  }
}

function fullscreenChanged() {
  fullscreen.value = isFullscreen();
}

onMounted(() => {
  document.addEventListener('fullscreenchange', fullscreenChanged);
  document.addEventListener('mozfullscreenchange', fullscreenChanged);
  document.addEventListener('webkitfullscreenchange', fullscreenChanged);
  document.addEventListener('msfullscreenchange', fullscreenChanged);
  fullscreenChanged();
});
</script>

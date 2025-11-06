<template>
  <div class="custom-container">
    <div class="mx-5 my-4 md:mt-6">
      <h1 class="song-title"><song-name :song="song" /></h1>
      <div class="mt-1 text-sm basic-content">
        <song-author-label :song="song" />
        <song-info :song="song" />
      </div>
    </div>
  </div>
  <song-box :song_lyric="song"></song-box>
</template>

<script>
import SongAuthorLabel from './components/SongAuthorLabel';
import SongBox from './components/SongBox/SongBox';
import Tags from './components/Tags';
import SongName from '~/components/SongName';
import SongInfo from '~/components/SongInfo';

export default {
  name: 'SongDetail',

  components: {
    SongBox,
    SongAuthorLabel,
    Tags,
    SongName,
    SongInfo,
  },

  props: ['song'],
};
</script>

<style lang="postcss" scoped>
.song-title {
  @apply text-2xl font-custom-medium;
}
</style>

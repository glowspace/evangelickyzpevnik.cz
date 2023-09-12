<template>
  <div class="m-5">
    <div class="my-4">
      <div>
        <h1 class="song-title"><song-name :song="song" /></h1>
        <div class="mt-1 text-sm basic-content">
          <song-author-label :song="song" />
          <song-info :song="song" />
        </div>
      </div>
      <!-- <div class="d-none d-md-block">
                <tags :song="song"></tags>
            </div> -->
    </div>
    <song-box :song_lyric="song"></song-box>
  </div>
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

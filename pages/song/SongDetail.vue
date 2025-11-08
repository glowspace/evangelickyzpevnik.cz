<template>
  <div class="custom-container">
    <div class="mx-5 my-4 md:mt-6">
      <h1 class="text-2xl font-custom-medium">{{ names[0] }}</h1>
      <p class="text-lg" v-if="names.length > 1">{{ names.slice(1).join(', ') }}</p>
      <div class="mt-1 text-sm basic-content">
        <song-author-label :song="song" />
        <song-info :song="song" />
      </div>
    </div>
  </div>
  <song-box :song_lyric="song"></song-box>
</template>

<script setup>
import SongAuthorLabel from './components/SongAuthorLabel';
import SongBox from './components/SongBox/SongBox';
import { getNames } from '~/components/Song/Name';

const props = defineProps(['song']);
const { variation } = useRuntimeConfig()?.public;
const names = computed(() => getNames(props.song, variation?.songbook))
</script>

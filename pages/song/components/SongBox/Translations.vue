<template>
  <table class="table m-0 w-full">
    <tbody>
      <tr>
        <th
          colspan="2"
          class="text-primary-700"
          v-if="song_lyric.song.song_lyrics.filter((s) => s.type == 0).length"
        >
          Originál
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in song_lyric.song.song_lyrics.filter(
          (s) => s.type == 0
        )"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
      ></SLItem>
      <tr>
        <th
          colspan="2"
          class="pt-5 text-error-500"
          v-if="song_lyric.song.song_lyrics.filter((s) => s.type == 1).length"
        >
          Překlady
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in song_lyric.song.song_lyrics.filter(
          (s) => s.type == 1
        )"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
      ></SLItem>
      <tr>
        <th
          colspan="2"
          class="pt-5 text-green"
          v-if="song_lyric.song.song_lyrics.filter((s) => s.type == 2).length"
        >
          Autorizované překlady
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in song_lyric.song.song_lyrics.filter(
          (s) => s.type == 2
        )"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
      ></SLItem>
    </tbody>
  </table>
</template>

<script setup>
import SLItem from '~/pages/search/components/SLItem';
const props = defineProps(['song_lyric']);
</script>

<style lang="postcss" scoped>
th {
  @apply font-medium text-left px-3 pb-2;
}
</style>

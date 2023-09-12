<template>
  <table class="table m-0 w-full">
    <tbody>
      <tr>
        <th colspan="2" class="text-primary" v-if="filterLyrics(0).length">
          Originál
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in filterLyrics(0)"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
        :active="song_lyric.id === props.song_lyric.id"
      ></SLItem>
      <tr>
        <th colspan="2" class="text-greendark" v-if="filterLyrics(2).length">
          {{
            filterLyrics(2).length == 1
              ? 'Autorizovaný překlad'
              : 'Autorizované překlady'
          }}
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in filterLyrics(2)"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
        :active="song_lyric.id === props.song_lyric.id"
      ></SLItem>
      <tr>
        <th colspan="2" class="text-error-600" v-if="filterLyrics(1).length">
          {{ filterLyrics(1).length == 1 ? 'Překlad' : 'Překlady' }}
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in filterLyrics(1)"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
        :active="song_lyric.id === props.song_lyric.id"
      ></SLItem>
    </tbody>
  </table>
</template>

<script setup>
import SLItem from '~/pages/search/components/SLItem';
const props = defineProps(['song_lyric']);

function filterLyrics(type) {
  return props.song_lyric.song.song_lyrics.filter((s) => s.type == type);
}
</script>

<style lang="postcss" scoped>
th {
  @apply font-custom-medium text-left px-3 pb-2 pt-5;
}

tr:first-child th {
  @apply pt-0;
}

tr.active {
  @apply bg-surface-100;
}
</style>

<template>
  <table class="table m-0 w-full">
    <tbody>
      <template
        v-for="subtable in [
          {
            labelOne: 'Originál',
            labelMore: 'Originály',
            typeNumber: 0,
            thClass: 'text-blue',
          },
          {
            labelOne: 'Autorizovaný překlad',
            labelMore: 'Autorizované překlady',
            typeNumber: 2,
            thClass: 'text-greendark',
          },
          {
            labelOne: 'Překlad',
            labelMore: 'Překlady',
            typeNumber: 1,
            thClass: 'text-red',
          },
        ]"
        :key="subtable.typeNumber"
      >
        <tr>
          <th
            colspan="2"
            :class="subtable.thClass"
            v-if="filterLyrics(subtable.typeNumber).length"
          >
            {{
              filterLyrics(subtable.typeNumber).length == 1
                ? subtable.labelOne
                : subtable.labelMore
            }}
          </th>
        </tr>
        <SongListItem
          v-for="song_lyric in filterLyrics(subtable.typeNumber)"
          :song_lyric="song_lyric"
          :key="song_lyric.id"
          :active="song_lyric.id === props.song_lyric.id"
          hideIcons
          allow-authors
        ></SongListItem>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import SongListItem from '~/components/Song/ListItem';
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
</style>

<template>
  <span v-if="multiline">
    <span :class="{ 'song-name': true, underline: active }">{{
      songName
    }}</span>
    <span
      class="song-secondary-name text-secondary text-sm"
      v-if="song.secondary_name_1"
    >
      <br />
      {{ song.secondary_name_1 }}
    </span>
    <span
      class="song-secondary-name text-secondary text-sm"
      v-if="song.secondary_name_2"
    >
      <br />
      {{ song.secondary_name_2 }}
    </span>
  </span>
  <span v-else>
    <span :class="{ 'song-name': true, underline: active }">{{
      songName
    }}</span>
    <span class="song-secondary-name" v-if="song.secondary_name_1">
      ({{
        song.secondary_name_1 +
        (song.secondary_name_2 ? ', ' + song.secondary_name_2 : '')
      }})
    </span>
  </span>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    songName() {
      return getName(this.song, this.$config.public.isEvangelicalSongbook);
    },
  },
};

function getName(song, isEvangelicalSongbook = false) {
  if (isEvangelicalSongbook) {
    const ezName = song.songbook_records?.find(
      (record) => record.pivot.songbook.id == 58
    )?.pivot.song_name;

    if (ezName != null) {
      return ezName;
    }
  }

  return song.name;
}

export function getFullName(song, isEvangelicalSongbook = false) {
  return song.secondary_name_1
    ? `${getName(song, isEvangelicalSongbook)} (${song.secondary_name_1}${
        song.secondary_name_2 ? ', ' + song.secondary_name_2 : ''
      })`
    : song.name;
}
</script>

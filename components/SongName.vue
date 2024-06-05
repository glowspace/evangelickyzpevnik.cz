<template>
  <span v-if="multiline">
    <span :class="{ 'song-name': true, underline: active }">{{
      songName
    }}</span>
    <span
      class="song-secondary-name text-secondary text-sm"
      v-for="name in secondaryNames"
    >
      <br />
      {{ name }}
    </span>
  </span>
  <span v-else>
    <span :class="{ 'song-name': true, underline: active }">{{
      songName
    }}</span>
    <span class="song-secondary-name" v-if="secondaryNames.length">
      ({{ secondaryNames.join(', ') }})
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
    names() {
      return getNames(this.song, this.$config.public.isEvangelicalSongbook);
    },
    secondaryNames() {
      return this.names.slice(1);
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

function getNames(song, isEvangelicalSongbook = false) {
  const names = [
    getName(song, isEvangelicalSongbook),
    song.secondary_name_1,
    song.secondary_name_2,
  ];
  const result = [];

  for (const name of names) {
    if (name && !result.includes(name)) {
      result.push(name);
    }
  }

  return result;
}

export function getFullName(song, isEvangelicalSongbook = false) {
  const names = getNames(song, isEvangelicalSongbook);

  if (names.length == 1) {
    return names[0];
  } else {
    return `${names[0]} (${names.slice(1).join(', ')})`;
  }
}
</script>

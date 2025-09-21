<template>
  <span v-if="multiline">
    <span :class="{ 'song-name': true, underline: active }">{{
      songName
    }}</span>
    <span
      class="song-secondary-name text-gray text-sm"
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
      return getName(this.song, this.$config.public.variation);
    },
    names() {
      return getNames(this.song, this.$config.public.variation);
    },
    secondaryNames() {
      return this.names.slice(1);
    },
  },
};

function getName(song, variation) {
  if (variation.songbook != null) {
    const songbookName = song.songbook_records?.find(
      (record) => record.pivot.songbook.id == variation.songbook
    )?.pivot.song_name;

    if (songbookName) {
      return songbookName;
    }
  }

  return song.name;
}

function getNames(song, variation) {
  const names = [
    getName(song, variation),
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

export function getFullName(song, variation) {
  const names = getNames(song, variation);

  if (names.length == 1) {
    return names[0];
  } else {
    return `${names[0]} (${names.slice(1).join(', ')})`;
  }
}
</script>

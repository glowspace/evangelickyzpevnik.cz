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
    songbookId: {
      default: null,
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
      return getNames(
        this.song,
        this.songbookId ?? this.$config.public.variation.songbook
      )[0];
    },
    secondaryNames() {
      return getNames(
        this.song,
        this.songbookId ?? this.$config.public.variation.songbook
      ).slice(1);
    },
  },
};

function getNames(song, songbookId) {
  if (songbookId != null && song.songbook_records != null) {
    const songbookName = song.songbook_records.find(
      (record) => record.pivot.songbook.id == songbookId
    )?.pivot.song_name;

    if (songbookName) {
      return [songbookName];
    }
  }

  return [song.name, song.secondary_name_1, song.secondary_name_2].filter(
    (name) => name
  );
}

export function getFullName(song, songbookId) {
  const names = getNames(song, songbookId);

  if (names.length == 1) {
    return names[0];
  } else {
    return `${names[0]} (${names.slice(1).join(', ')})`;
  }
}
</script>

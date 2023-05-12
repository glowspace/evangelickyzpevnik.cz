<template>
  <tr>
    <!-- <td class="p-1 align-middle text-right w-min">
      <nuxt-link
        class="p-2 pl-3 w-full d-flex justify-content-between text-secondary"
        :to="song_lyric.public_route"
      >
        <span>{{ number }}</span>
      </nuxt-link>
    </td> -->
    <td class="p-1" :colspan="song_lyric.lang != 'cs' ? 1 : 2">
      <nuxt-link class="p-2 w-full inline-block" :to="song_lyric.public_route">
        <song-name :song="song_lyric" :multiline="true" />
      </nuxt-link>
    </td>
    <!-- <td class="p-1 align-middle" :colspan="song_lyric.lang != 'cs' ? 1 : 2">
      <span
        v-for="(ap, authorIndex) in song_lyric.authors_pivot"
        :key="authorIndex"
      >
        <span v-if="authorIndex">,</span>
        <nuxt-link
          :to="ap.pivot.author.public_route"
          :title="
            song_lyric.type
              ? { GENERIC: '', LYRICS: 'text', MUSIC: 'hudba' }['LYRICS']
              : { GENERIC: '', LYRICS: 'text', MUSIC: 'hudba' }[
                  ap.pivot.authorship_type
                ]
          "
          class="text-secondary"
          >{{ ap.pivot.author.name }}</nuxt-link
        >
      </span>
    </td> -->
    <td
      class="text-right pr-3 uppercase text-sm"
      v-if="song_lyric.lang != 'cs'"
    >
      <span
        :class="[
          {
            'text-secondary/20': !song_lyric.has_lyrics,
          },
          'pr-sm-0 pr-1',
        ]"
        :title="song_lyric.lang_string"
        >{{ song_lyric.lang.substring(0, 3) }}</span
      >
    </td>
    <td class="w-24" v-if="!hideIcons">
      <div class="icons">
        <!-- todo: replace with image and remove FA icons -->
        <BasicIcon
          v-if="song_lyric.has_chords"
          fa="fas fa-guitar text-primary text-lg -mt-px"
          title="Tato píseň má přidané akordy."
        ></BasicIcon>
        <BasicIcon
          v-else-if="song_lyric.has_lyrics"
          title="U této písně je zaznamenán text (bez akordů)."
          >subject</BasicIcon
        >
        <BasicIcon v-else class="text-secondary/20">subject</BasicIcon>

        <BasicIcon
          v-if="song_lyric.scores.length"
          title="U této písně je k dispozici soubor s notami."
          class="text-error-500"
          fill
          >audio_file</BasicIcon
        >
        <BasicIcon v-else class="text-secondary/20" fill>audio_file</BasicIcon>

        <BasicIcon
          v-if="song_lyric.recordings.length"
          title="U této písně je k dispozici nahrávka."
          class="text-green"
          fill
          >headphones</BasicIcon
        >
        <BasicIcon v-else class="text-secondary/20" fill>headphones</BasicIcon>
      </div>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps(['song_lyric', 'number', 'hideIcons']);
</script>

<style lang="postcss" scoped>
tr:hover {
 @apply bg-surface-50;
}

td {
  @apply align-middle;
}

.icons {
  @apply flex;

  & > * {
    @apply mr-2;

    width: 25px;
    text-align: center;
  }
}
</style>

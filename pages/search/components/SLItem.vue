<template>
  <tr :class="{ 'bg-surface-200': active }">
    <!-- <td class="p-1 align-middle text-right w-min">
      <nuxt-link
        class="p-2 pl-3 w-full d-flex justify-content-between text-secondary"
        :to="song_lyric.public_route"
      >
        <span>{{ number }}</span>
      </nuxt-link>
    </td> -->
    <td :colspan="song_lyric.lang != 'cs' ? 1 : 2">
      <BasicClickable class="p-3 block" :to="song_lyric.public_route">
        <song-name :song="song_lyric" :multiline="true" :active="active" />
      </BasicClickable>
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
      <BasicClickable class="icons" :to="song_lyric.public_route" tabindex="-1">
        <BasicIcon
          v-if="song_lyric.has_chords"
          name="fas fa-guitar"
          type="fa"
          class="text-primary"
          title="Tato píseň má přidané akordy."
        />
        <BasicIcon
          v-else-if="song_lyric.has_lyrics"
          name="subject"
          title="U této písně je zaznamenán text (bez akordů)."
        />
        <BasicIcon v-else name="subject" class="text-secondary/20" />

        <BasicIcon
          v-if="song_lyric.scores.length"
          name="audio_file"
          title="U této písně je k dispozici soubor s notami."
          class="text-error-500"
          fill
        />
        <BasicIcon v-else name="audio_file" class="text-secondary/20" fill />

        <BasicIcon
          v-if="song_lyric.recordings.length"
          name="headphones"
          title="U této písně je k dispozici nahrávka."
          class="text-green"
          fill
        />
        <BasicIcon v-else name="headphones" class="text-secondary/20" fill />
      </BasicClickable>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps(['song_lyric', 'number', 'hideIcons', 'active']);
</script>

<style lang="postcss" scoped>
tr:hover,
tr:focus-within {
  @apply bg-surface-50;
}

tr:active {
  @apply bg-surface-200;
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

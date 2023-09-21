<template>
  <tr :class="{ 'bg-surface-200': active }">
    <td
      v-if="isSearch"
      class="hidden lg:table-cell text-secondary text-right w-16 text-sm"
    >
      <BasicClickable
        class="pl-7 p-3"
        tabindex="-1"
        :to="song_lyric.public_route"
      >
        {{ number }}
      </BasicClickable>
    </td>
    <td>
      <BasicClickable
        class="block p-3 md:pl-7 lg:pl-3"
        :to="song_lyric.public_route"
      >
        <span v-if="specialNumber" :class="{ 'lg:hidden': isSearch }"
          >{{ specialNumber }}.
        </span>
        <song-name :song="song_lyric" :multiline="true" :active="active" />
      </BasicClickable>
    </td>
    <td v-if="isSearch" class="hidden lg:table-cell text-secondary">
      <span
        v-for="(ap, authorIndex) in song_lyric.authors_pivot"
        :key="authorIndex"
      >
        <span v-if="authorIndex">, </span>
        <BasicLink
          :to="ap.pivot.author.public_route"
          :title="
            song_lyric.type
              ? authorshipTypes['LYRICS']
              : authorshipTypes[ap.pivot.authorship_type]
          "
        >
          {{ ap.pivot.author.name }}
        </BasicLink>
      </span>
    </td>
    <td
      :class="[
        'text-right pr-3 uppercase text-sm',
        { 'text-secondary/20': !song_lyric.has_lyrics },
        { 'md:pr-6': isSearch },
      ]"
      :title="song_lyric.lang_string"
    >
      {{ song_lyric.lang != 'cs' ? song_lyric.lang.substring(0, 3) : '' }}
    </td>
    <td class="w-24" :class="{ 'md:pr-6': isSearch }" v-if="!hideIcons">
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
const props = defineProps([
  'song_lyric',
  'number',
  'specialNumber',
  'hideIcons',
  'active',
  'isSearch',
]);
const authorshipTypes = { GENERIC: '', LYRICS: 'text', MUSIC: 'hudba' };
</script>

<style lang="postcss" scoped>
tr:hover,
tr:focus-within {
  @apply bg-surface-50;
}

tr:active {
  @apply bg-surface-200;
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

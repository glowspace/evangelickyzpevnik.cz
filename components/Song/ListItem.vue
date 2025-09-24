<template>
  <tr :class="{ 'bg-surface-200': active }">
    <td
      v-if="isSearch"
      class="hidden lg:table-cell text-gray text-right w-16 text-sm"
    >
      <BasicClickable
        class="pl-7 p-3 whitespace-nowrap"
        tabindex="-1"
        :to="song_lyric.public_route"
      >
        {{ `${songbookPrefix}${songNumber}` }}
      </BasicClickable>
    </td>
    <td>
      <BasicClickable
        class="block p-3 lg:pl-3"
        :class="{ 'md:pl-7': isSearch }"
        :to="song_lyric.public_route"
      >
        <span v-if="forceNumber" :class="{ 'lg:hidden': isSearch }"
          >{{ songNumber }}.
        </span>
        <song-name
          :song="song_lyric"
          :songbook-id="songbookId"
          multiline
          :active="active"
        />
      </BasicClickable>
    </td>
    <td
      v-if="allowAuthors || isSearch"
      class="text-gray hidden"
      :class="[isSearch ? 'lg:table-cell' : 'sm:table-cell']"
    >
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
        { 'text-gray/20': !song_lyric.has_lyrics },
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
          class="text-blue"
          title="Tato píseň má přidané akordy."
        />
        <BasicIcon
          v-else-if="song_lyric.has_lyrics"
          name="subject"
          title="U této písně je zaznamenán text (bez akordů)."
        />
        <BasicIcon v-else name="subject" class="text-gray/20" />

        <BasicIcon
          v-if="song_lyric.scores.length"
          name="audio_file"
          title="U této písně je k dispozici soubor s notami."
          class="text-red"
          fill
        />
        <BasicIcon v-else name="audio_file" class="text-gray/20" fill />

        <BasicIcon
          v-if="song_lyric.recordings.length"
          name="headphones"
          title="U této písně je k dispozici nahrávka."
          class="text-green"
          fill
        />
        <BasicIcon v-else name="headphones" class="text-gray/20" fill />
      </BasicClickable>
    </td>
  </tr>
</template>

<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  song_lyric: Object,
  songbookId: null,
  forceNumber: Boolean,
  hideIcons: Boolean,
  active: Boolean,
  isSearch: Boolean,
  allowAuthors: Boolean,
});
const authorshipTypes = { GENERIC: '', LYRICS: 'text', MUSIC: 'hudba' };
const songbookPivot = computed(() => {
  if (props.songbookId != null && props.song_lyric.songbook_records != null) {
    const record = props.song_lyric.songbook_records.find(
      (r) => r.pivot.songbook.id == props.songbookId
    );

    if (
      record != null &&
      record.pivot.number &&
      record.pivot.songbook.shortcut
    ) {
      return record.pivot;
    }
  }
});
const songbookPrefix = computed(() =>
  config.public.variation.songbook != props.songbookId &&
  songbookPivot.value != null
    ? `${songbookPivot.value.songbook.shortcut} `
    : ''
);
const songNumber = computed(() =>
  songbookPivot.value != null
    ? songbookPivot.value.number
    : props.song_lyric.song_number
);
</script>

<script>
import gql from 'graphql-tag';
export const SongListItemFragment = gql`
  fragment SongListItemFragment on SongLyric {
    id
    name
    secondary_name_1
    secondary_name_2
    songbook_records {
      pivot {
        songbook {
          id
        }
        song_name
      }
    }
    public_route
    type
    authors_pivot {
      pivot {
        author {
          name
          public_route
        }
        authorship_type
      }
    }
    has_lyrics
    lang
    lang_string
  }
`;
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

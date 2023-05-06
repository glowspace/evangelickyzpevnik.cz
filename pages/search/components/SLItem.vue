<template>
  <tr>
    <td class="p-1 align-middle text-right w-min">
      <nuxt-link
        class="p-2 pl-3 w-100 d-flex justify-content-between text-secondary"
        :to="song_lyric.public_route"
      >
        <span>{{ number }}</span>
      </nuxt-link>
    </td>
    <td class="p-1 align-middle">
      <nuxt-link class="p-2 w-100 d-inline-block" :to="song_lyric.public_route">
        <song-name :song="song_lyric" :multiline="true" />
      </nuxt-link>
    </td>
    <td class="p-1 align-middle" :colspan="song_lyric.lang != 'cs' ? 1 : 2">
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
    </td>
    <td
      class="no-left-padding text-right text-uppercase small align-middle pr-3"
      v-if="song_lyric.lang != 'cs'"
    >
      <span
        :class="[
          {
            'text-very-muted': !song_lyric.has_lyrics,
          },
          'pr-sm-0 pr-1',
        ]"
        :title="song_lyric.lang_string"
        >{{ song_lyric.lang.substring(0, 3) }}</span
      >
    </td>
    <td
      style="width: 10px"
      class="no-left-padding align-middle d-none d-sm-table-cell"
    >
      <i
        v-if="song_lyric.has_chords"
        class="fas fa-guitar text-primary"
        title="Tato píseň má přidané akordy."
      ></i>
      <i
        v-else-if="song_lyric.has_lyrics"
        class="fas fa-align-left text-secondary"
        title="U této písně je zaznamenán text (bez akordů)."
      ></i>
      <i v-else class="fas fa-align-left text-very-muted"></i>
    </td>
    <td
      style="width: 10px"
      class="no-left-padding align-middle d-none d-sm-table-cell"
    >
      <i
        v-if="song_lyric.scores.length"
        class="fas fa-file-alt text-danger"
        title="U této písně je k dispozici soubor s notami."
      ></i>
      <i v-else class="fas fa-file-alt text-very-muted"></i>
    </td>
    <td
      style="width: 10px"
      class="no-left-padding pr-4 align-middle d-none d-sm-table-cell"
    >
      <i
        v-if="song_lyric.recordings.length"
        class="fas fa-headphones text-success"
        title="U této písně je k dispozici nahrávka."
      ></i>
      <i v-else class="fas fa-headphones text-very-muted"></i>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps(['song_lyric', 'number']);
</script>

<template>
  <div :class="[{ 'opacity-100': randomTags.length }, 'flex flex-row flex-wrap items-center opacity-0 h-10 overflow-hidden ml-6 mr-4']">
    <BasicButton
      icon-name="filter_alt"
      icon-fill
      icon-only
      compact
      @click="$emit('update:modelValue', {})"
    />
    <client-only>
      <BasicChip
        v-for="tag in randomTags"
        :key="tag.id"
        @click="selectTag(tag)"
        >{{ tag.name }}</BasicChip
      >
    </client-only>
  </div>
</template>

<script>
import { fetchFiltersQuery } from './fetchFiltersQuery.graphql';

const requiredAmountOfSongs = 10;

export default {
  props: ['modelValue'],

  data() {
    return {
      selected_tags: {},
    };
  },

  apollo: {
    $prefetch: false,
    tags_generic: {
      query: fetchFiltersQuery,
    },
    tags_liturgy_part: {
      query: fetchFiltersQuery,
    },
    tags_liturgy_period: {
      query: fetchFiltersQuery,
    },
    tags_saints: {
      query: fetchFiltersQuery,
    },
    tags_sacred_occasion: {
      query: fetchFiltersQuery,
    },
  },

  computed: {
    usefulTags() {
      // do not include regenschori tag types
      return [
        ...this.tags_generic.filter((t) => t.song_lyrics_count >= requiredAmountOfSongs),
        ...this.tags_liturgy_part.filter((t) => t.song_lyrics_count >= requiredAmountOfSongs),
        ...this.tags_liturgy_period.filter((t) => t.song_lyrics_count >= requiredAmountOfSongs),
        ...this.tags_saints.filter((t) => t.song_lyrics_count >= requiredAmountOfSongs),
        ...this.tags_sacred_occasion.filter((t) => t.song_lyrics_count >= requiredAmountOfSongs),
      ];
    },

    randomTags() {
      if (process.client && this.$apollo.loading === false) {
        return this.shuffleArray(this.usefulTags).slice(0, 10);
      } else {
        return [];
      }
    },
  },

  methods: {
    selectTag(tag) {
      this.selected_tags[tag.id] = true;

      // notify the parent that sth has changed
      this.$emit('update:modelValue', this.selected_tags);
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>

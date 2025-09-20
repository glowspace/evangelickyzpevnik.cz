<template>
  <div class="relative mt-4" v-if="categoryHasSongs">
    <div
      :class="[
        'flex flex-wrap items-center justify-between',
        { relative: !isClosed },
      ]"
    >
      <BasicBadge
        :small="categoryContainsSelected"
        :badge-class="'!top-1 !-right-2 ' + badgeColor"
        >{{ heading }}</BasicBadge
      >
      <BasicButton
        :class="['stretched-link']"
        @click="isClosed = !isClosed"
        :icon-name="isClosed ? 'expand_more' : 'expand_less'"
        icon-only
        compact
      ></BasicButton>
    </div>
    <div :class="{ 'whitespace-nowrap overflow-hidden opacity-60': isClosed }">
      <BasicChip
        :class="[{ active: isSelectedTag(tag) }, 'tag-' + color]"
        v-for="tag in tagsInCategory.filter(
          (tag) => tagHasSongs(tag) || isSelectedTag(tag)
        )"
        :key="'tag-' + tag.id"
        @click="$emit('selectTag', tag)"
        >{{ tag.name }}</BasicChip
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['heading', 'color', 'tagsInCategory', 'selectedTags'],

  data() {
    return {
      isClosed: true,
    };
  },

  mounted() {
    if (this.categoryContainsSelected) {
      this.isClosed = false;
    }
  },

  computed: {
    categoryContainsSelected() {
      return this.tagsInCategory.some((tag) => {
        if (this.selectedTags[tag.id]) {
          return true;
        }
      });
    },

    badgeColor() {
      switch (this.color) {
        case 'green':
          return '!bg-green';
        case 'red':
          return '!bg-error-600';
        case 'yellow':
          return '!bg-yellow';
        case 'blue':
          return '!bg-blue';
        default:
          return '';
      }
    },

    categoryHasSongs() {
      return this.tagsInCategory.some((tag) => this.tagHasSongs(tag));
    },
  },

  watch: {
    categoryContainsSelected(val) {
      if (val) {
        this.isClosed = false;
      }
    },
  },

  methods: {
    isSelectedTag(tag) {
      return this.selectedTags[tag.id];
    },

    tagHasSongs(tag) {
      if ('song_lyrics_count' in tag) {
        return !!tag.song_lyrics_count;
      }

      return true;
    },
  },
};
</script>

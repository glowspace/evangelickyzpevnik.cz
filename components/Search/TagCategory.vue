<template>
  <div class="relative">
    <div
      :class="[
        'mt-2 flex flex-wrap items-center justify-between',
        { relative: !isClosed },
      ]"
    >
      <span>{{ heading }}</span>
      <BasicButton
        :class="['stretched-link']"
        @click="isClosed = !isClosed"
        :icon="isClosed ? 'expand_more' : 'expand_less'"
        icon-only
        compact
        text
      ></BasicButton>
    </div>
    <div :class="{ 'whitespace-nowrap overflow-hidden': isClosed }">
      <BasicChip
        :class="[{ 'active': isSelectedTag(tag) }, 'tag-' + color]"
        v-for="tag in tagsInCategory.filter((t) => t.song_lyrics_count !== 0)"
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
  },
};
</script>

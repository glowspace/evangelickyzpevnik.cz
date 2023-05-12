<template>
  <div v-if="$apollo.loading || !tags_generic">
    <template v-for="(x, key2) in [1.3, 1.2, 1.4, 1.1, 1.2, 1.3]" :key="key2">
      <!-- <v-skeleton-loader type="heading" class="my-3" :key="key2" /> -->
      <div
        class="tag d-inline-block"
        v-for="(w, key) in [400, 200, 300, 350, 250, 350, 400, 250, 200, 450]"
        :key="key + '.' + key2"
        :style="'width:' + (w / 3) * x + 'px'"
      >
        &nbsp;
      </div>
    </template>
  </div>
  <div v-else>
    <BasicButtonGroup class="mr-2 mb-2">
      <BasicButtonGroupItem
        :class="{ active: !localShowAuthors }"
        @click="localShowAuthors = false"
      >
        <BasicIcon>music_note</BasicIcon>
        písně
      </BasicButtonGroupItem>
      <BasicButtonGroupItem
        :class="{ active: localShowAuthors }"
        @click="localShowAuthors = true"
      >
        <BasicIcon :fill="localShowAuthors">person</BasicIcon>
        autoři
      </BasicButtonGroupItem>
    </BasicButtonGroup>
    <BasicButtonGroup
      v-if="!localShowAuthors"
      :title="[searchString ? 'Písně jsou řazeny podle vyhledávání.' : '']"
    >
      <BasicButtonGroupItem
        :class="{ active: localSort == 0 }"
        :disabled="!!searchString"
        title="řadit náhodně"
        @click="
          refreshSeed();
          localSort = 0;
          localDescending = false;
        "
      >
        <BasicIcon>shuffle</BasicIcon>
        náhodně
      </BasicButtonGroupItem>
      <BasicButtonGroupItem
        :class="{ active: localSort == 1 }"
        :disabled="!!searchString"
        :title="
          'řadit podle abecedy' +
          (localSort == 1
            ? localDescending
              ? 'vzestupně'
              : 'sestupně'
            : 'vzestupně')
        "
        @click="
          if (localSort == 1) {
            localDescending = !localDescending;
          } else {
            localSort = 1;
            localDescending = false;
          }
        "
      >
        <BasicIcon>sort_by_alpha</BasicIcon>
        {{ localSort == 1 ? (!localDescending ? 'A–Z' : 'Z–A') : 'A–Z' }}
      </BasicButtonGroupItem>
      <BasicButtonGroupItem
        :class="{ active: localSort == 2 }"
        :disabled="!!searchString"
        :title="
          'řadit podle čísla' +
          (localSort == 2
            ? localDescending
              ? 'vzestupně'
              : 'sestupně'
            : 'vzestupně')
        "
        @click="
          if (localSort == 2) {
            localDescending = !localDescending;
          } else {
            localSort = 2;
            localDescending = false;
          }
        "
      >
        <BasicIcon>pin</BasicIcon>
        {{ localSort == 2 ? (!localDescending ? '1–9' : '9–1') : '1–9' }}
      </BasicButtonGroupItem>
      <BasicButtonGroupItem
        v-if="searchString"
        class="!px-2"
        :class="{ active: searchString }"
      >
        <BasicIcon>search</BasicIcon>
      </BasicButtonGroupItem>
    </BasicButtonGroup>
    <div v-if="!localShowAuthors" class="mb-3">
      <SearchTagCategory
        heading="Mše svatá"
        color="blue"
        :tags-in-category="tags_liturgy_part"
        :selected-tags="selected_tags"
        @selectTag="selectTag"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="Liturgický rok"
        color="red"
        :tags-in-category="tags_liturgy_period"
        :selected-tags="selected_tags"
        @selectTag="selectTag"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="Svátosti a pobožnosti"
        color="green"
        :tags-in-category="tags_sacred_occasion"
        :selected-tags="selected_tags"
        @selectTag="selectTag"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="K příležitostem"
        color="green"
        :tags-in-category="tags_generic"
        :selected-tags="selected_tags"
        @selectTag="selectTag"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="Ke svatým"
        color="green"
        :tags-in-category="tags_saints"
        :selected-tags="selected_tags"
        @selectTag="selectTag"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="Zpěvníky"
        color="yellow"
        :tags-in-category="songbooks"
        :selected-tags="selected_songbooks"
        @selectTag="selectSongbook"
      ></SearchTagCategory>
      <SearchTagCategory
        heading="Jazyky"
        color="red"
        :tags-in-category="all_languages"
        :selected-tags="selected_languages"
        @selectTag="selectLanguage"
      ></SearchTagCategory>
    </div>
  </div>
</template>

<script>
import { fetchFiltersQuery } from './fetchFiltersQuery.graphql';

export default {
  props: [
    'selected-tags',
    'selected-songbooks',
    'selected-languages',
    'show-authors',
    'sort',
    'descending',
    'search-string',
  ],

  data() {
    return {
      all_languages: [
        { id: 'cs', name: 'čeština' },
        { id: 'sk', name: 'slovenština' },
        { id: 'en', name: 'angličtina' },
        { id: 'la', name: 'latina' },
        { id: 'pl', name: 'polština' },
        { id: 'de', name: 'němčina' },
        { id: 'fr', name: 'francouzština' },
        { id: 'es', name: 'španělština' },
        { id: 'pt', name: 'portugalština' },
        { id: 'it', name: 'italština' },
        { id: 'sv', name: 'svahilština' },
        { id: 'he', name: 'hebrejština' },
        { id: 'cr', name: 'chorvatština' },
        { id: 'cu', name: 'staroslověnština' },
        { id: 'mixed', name: 'vícejazyčná píseň' },
      ],
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
    songbooks: {
      query: fetchFiltersQuery,
    },
  },

  computed: {
    localShowAuthors: {
      get() {
        return this.showAuthors;
      },
      set(val) {
        this.$emit('update:show-authors', val);
      },
    },

    localSort: {
      get() {
        return this.sort;
      },
      set(val) {
        this.$emit('update:sort', val);
      },
    },

    localDescending: {
      get() {
        return this.descending;
      },
      set(val) {
        this.$emit('update:descending', val);
      },
    },

    selected_tags: {
      get() {
        return this.selectedTags;
      },
      set(val) {
        this.$emit('update:selected-tags', val);
      }
    },
    selected_songbooks: {
      get() {
        return this.selectedSongbooks;
      },
      set(val) {
        this.$emit('update:selected-songbooks', val);
      }
    },
    selected_languages: {
      get() {
        return this.selectedLanguages;
      },
      set(val) {
        this.$emit('update:selected-languages', val);
      }
    },
  },

  methods: {
    openRSWithCurrentQS() {
      location.href =
        this.$config.public.regenschoriUrl + window.location.search;
    },

    selectTag(tag) {
      if (!this.isSelectedTag(tag)) {
        this.selected_tags[tag.id] = true;
      } else {
        delete this.selected_tags[tag.id];
      }
    },

    selectSongbook(songbook) {
      if (!this.isSelectedSongbook(songbook)) {
        this.selected_songbooks[songbook.id] = true;
      } else {
        delete this.selected_songbooks[songbook.id];
      }
    },

    selectLanguage(language) {
      if (!this.isSelectedLanguage(language)) {
        this.selected_languages[language.id] = true;
      } else {
        delete this.selected_languages[language.id];
      }
    },

    isSelectedTag(tag) {
      return this.selected_tags[tag.id];
    },

    isSelectedSongbook(songbook) {
      return this.selected_songbooks[songbook.id];
    },

    isSelectedLanguage(language) {
      return this.selected_languages[language.id];
    },

    refreshSeed() {
      this.$emit('refresh-seed', null);
    },

    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
      } catch (err) {}

      document.body.removeChild(textArea);
    },
    copyUrl() {
      let text = window.location.href;
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () {},
        function (err) {}
      );
    },
  },

  watch: {
    tags_generic(val, prev) {
      if (val && !prev) {
        this.$emit('tags-loaded', null);
      }
    },
  },
};
</script>

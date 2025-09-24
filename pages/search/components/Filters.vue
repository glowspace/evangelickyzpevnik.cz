<template>
  <div>
    <template v-if="isFilterRow">
      <template v-if="true || !$apollo.loading">
        <FilterRowItem
          v-if="localShowAuthors"
          @click="localShowAuthors = false"
        >
          autoři
        </FilterRowItem>
        <FilterRowItem
          v-if="!searchString && localSort.by != 0"
          @click="
            refreshSeed();
            localSort.by = 0;
            localSort.desc = false;
          "
        >
          <span v-if="localSort.by == 1 && localSort.desc">Z–A</span>
          <span v-else-if="localSort.by == 1">A–Z</span>
          <span v-else-if="localSort.by == 2 && localSort.desc">9–1</span>
          <span v-else>1–9</span>
        </FilterRowItem>
        <template
          v-if="
            /* this ensures that no *array of tags* is null */
            tags_liturgy_part &&
            tags_liturgy_period &&
            tags_sacred_occasion &&
            tags_generic &&
            tags_saints
          "
          v-for="tag in [
            ...tags_liturgy_part,
            ...tags_liturgy_period,
            ...tags_sacred_occasion,
            ...tags_generic,
            ...tags_saints,
          ]"
          :key="tag.id"
        >
          <FilterRowItem v-if="isSelectedTag(tag)" @click="selectTag(tag)">
            {{ tag.name }}
          </FilterRowItem>
        </template>
        <template v-for="tag in songbooks" :key="tag.id">
          <FilterRowItem
            v-if="isSelectedTag(tag, 'songbooks')"
            @click="selectTag(tag, 'songbooks')"
          >
            {{ tag.name }}
          </FilterRowItem>
        </template>
        <template v-for="tag in all_languages" :key="tag.id">
          <FilterRowItem
            v-if="isSelectedTag(tag, 'languages')"
            @click="selectTag(tag, 'languages')"
          >
            {{ tag.name }}
          </FilterRowItem>
        </template>
      </template>
    </template>
    <template v-else>
      <div v-if="$apollo.loading || !tags_generic">
        <template
          v-for="(x, key2) in [1.3, 1.2, 1.4, 1.1, 1.2, 1.3]"
          :key="key2"
        >
          <!-- <v-skeleton-loader type="heading" class="my-3" :key="key2" /> -->
          <div
            class="tag d-inline-block"
            v-for="(w, key) in [
              400, 200, 300, 350, 250, 350, 400, 250, 200, 450,
            ]"
            :key="key + '.' + key2"
            :style="'width:' + (w / 3) * x + 'px'"
          >
            &nbsp;
          </div>
        </template>
      </div>
      <div v-else>
        <BasicButtonGroup
          v-if="!$config.public.variation.hideAuthorSearch"
          class="mr-2 mb-2"
        >
          <BasicButtonGroupItem
            :class="{ active: !localShowAuthors }"
            @click="localShowAuthors = false"
          >
            <BasicIcon name="music_note" />
            písně
          </BasicButtonGroupItem>
          <BasicButtonGroupItem
            :class="{ active: localShowAuthors }"
            @click="localShowAuthors = true"
          >
            <BasicIcon name="person" :fill="localShowAuthors" />
            autoři
          </BasicButtonGroupItem>
        </BasicButtonGroup>
        <BasicButtonGroup
          v-if="!localShowAuthors"
          :title="[searchString ? 'Písně jsou řazeny podle vyhledávání.' : '']"
        >
          <BasicButtonGroupItem
            :class="{ active: localSort.by == 0 }"
            :disabled="!!searchString"
            title="řadit náhodně"
            @click="
              refreshSeed();
              localSort.by = 0;
              localSort.desc = false;
            "
          >
            <BasicIcon name="shuffle" />
            náhodně
          </BasicButtonGroupItem>
          <BasicButtonGroupItem
            :class="{ active: localSort.by == 1 }"
            :disabled="!!searchString"
            :title="
              'řadit podle abecedy' +
              (localSort.by == 1
                ? localSort.desc
                  ? 'vzestupně'
                  : 'sestupně'
                : 'vzestupně')
            "
            @click="
              if (localSort.by == 1) {
                localSort.desc = !localSort.desc;
              } else {
                localSort.by = 1;
                localSort.desc = false;
              }
            "
          >
            <BasicIcon name="sort_by_alpha" />
            {{ localSort.by == 1 ? (!localSort.desc ? 'A–Z' : 'Z–A') : 'A–Z' }}
          </BasicButtonGroupItem>
          <BasicButtonGroupItem
            :class="{ active: localSort.by == 2 }"
            :disabled="!!searchString"
            :title="
              'řadit podle čísla' +
              (localSort.by == 2
                ? localSort.desc
                  ? 'vzestupně'
                  : 'sestupně'
                : 'vzestupně')
            "
            @click="
              if (localSort.by == 2) {
                localSort.desc = !localSort.desc;
              } else {
                localSort.by = 2;
                localSort.desc = false;
              }
            "
          >
            <BasicIcon name="pin" />
            {{ localSort.by == 2 ? (!localSort.desc ? '1–9' : '9–1') : '1–9' }}
          </BasicButtonGroupItem>
          <BasicButtonGroupItem
            v-if="searchString"
            class="!pl-2 !pr-3"
            :class="{ active: searchString }"
          >
            <BasicIcon name="search" />
          </BasicButtonGroupItem>
        </BasicButtonGroup>
        <div
          v-if="!localShowAuthors && !$config.public.variation.hideTags"
          class="mb-3"
        >
          <SearchTagCategory
            heading="Mše svatá"
            color="blue"
            :tags-in-category="tags_liturgy_part"
            :selected-tags="localFilters.tags"
            @selectTag="selectTag"
          ></SearchTagCategory>
          <SearchTagCategory
            heading="Liturgický rok"
            color="red"
            :tags-in-category="tags_liturgy_period"
            :selected-tags="localFilters.tags"
            @selectTag="selectTag"
          ></SearchTagCategory>
          <SearchTagCategory
            heading="Svátosti a pobožnosti"
            color="green"
            :tags-in-category="tags_sacred_occasion"
            :selected-tags="localFilters.tags"
            @selectTag="selectTag"
          ></SearchTagCategory>
          <SearchTagCategory
            heading="K příležitostem"
            color="green"
            :tags-in-category="tags_generic"
            :selected-tags="localFilters.tags"
            @selectTag="selectTag"
          ></SearchTagCategory>
          <SearchTagCategory
            heading="Ke svatým"
            color="green"
            :tags-in-category="tags_saints"
            :selected-tags="localFilters.tags"
            @selectTag="selectTag"
          ></SearchTagCategory>
          <SearchTagCategory
            v-if="$config.public.variation.songbook == null"
            heading="Zpěvníky"
            color="yellow"
            :tags-in-category="songbooks"
            :selected-tags="localFilters.songbooks"
            @selectTag="(t) => selectTag(t, 'songbooks')"
          ></SearchTagCategory>
          <SearchTagCategory
            heading="Jazyky"
            color="red"
            :tags-in-category="all_languages"
            :selected-tags="localFilters.languages"
            @selectTag="(t) => selectTag(t, 'languages')"
          ></SearchTagCategory>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import tagsFilters from './tagsFilters';
import FilterRowItem from './FilterRowItem';

export default {
  props: [
    'is-filter-row',
    'filters',
    'show-authors',
    'sort',
    'search-string',
  ],

  components: { FilterRowItem },

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
    ...tagsFilters,
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

    localFilters: {
      get() {
        return this.filters;
      },
      set(val) {
        this.$emit('update:filters', val);
      },
    },
  },

  methods: {
    openRSWithCurrentQS() {
      location.href =
        this.$config.public.regenschoriUrl + window.location.search;
    },

    selectTag(tag, type = 'tags') {
      if (!this.isSelectedTag(tag, type)) {
        this.localFilters[type][tag.id] = true;
      } else {
        delete this.localFilters[type][tag.id];
      }
    },

    isSelectedTag(tag, type = 'tags') {
      return this.localFilters[type][tag.id];
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

<template>
  <div
    class="grid grid-cols-1"
    :class="{ 'md:grid-cols-[60%_1fr] xl:grid-cols-[66%_1fr]': !init }"
  >
    <div>
      <div v-if="init" class="custom-container md:mt-8">
        <Logo />
      </div>
      <StickyContainer :onDashboard="init">
        <div :class="{ 'custom-container': init, 'md:mt-4 lg:mx-5': !init }">
          <SearchBox
            v-model="searchString"
            :on-dashboard="init"
            :search-songs="!showAuthors"
            :song-loading="songLoading"
            @enter="inputEnter"
            @clickBox="init = false"
          />
          <FilterRow v-if="!init">
            <template #row>
              <Filters
                filter-row-variant="editable"
                v-model:filters="filters"
                v-model:show-authors="showAuthors"
                v-model:sort="sort"
                :search-string="searchString"
                @refresh-seed="randomizeSeed"
                @input="updateHistoryState"
              ></Filters>
            </template>
            <Filters
              v-model:filters="filters"
              v-model:show-authors="showAuthors"
              v-model:sort="sort"
              :search-string="searchString"
              @refresh-seed="randomizeSeed"
              @input="updateHistoryState"
            ></Filters>
          </FilterRow>
        </div>
      </StickyContainer>
      <div class="custom-container" v-if="init">
        <InitFilters
          v-if="!$config.public.variation.hideTags"
          v-model="filters.tags"
          @update:modelValue="init = false"
        ></InitFilters>
        <div class="text-center mt-1">
          <BasicButton
            @click="init = false"
            icon-name="add"
            class="text-primary -ml-3"
          >
            Zobrazit všechy písně
          </BasicButton>
        </div>
      </div>
      <div
        v-if="init"
        class="p-5 sm:grid sm:grid-cols-2 gap-x-7 gap-y-5 space-y-4 sm:space-y-0 max-w-[1000px] mx-auto"
      >
        <Dashboard />
      </div>
      <div v-if="urlLoaded" v-show="!init">
        <SongList
          v-if="!showAuthors"
          :search-string="searchString"
          :filters="filters"
          :sort="sort"
          :seed="seed"
          @query-loaded="queryLoaded"
        ></SongList>
        <AuthorsList
          v-else
          :search-string="searchString"
          @query-loaded="queryLoaded"
        ></AuthorsList>
      </div>
    </div>
    <div
      v-if="!init"
      class="hidden md:block sticky top-0 p-8 h-screen overflow-auto border-l border-primary-150 bg-surface-50"
    >
      <div>
        <Filters
          v-model:filters="filters"
          v-model:show-authors="showAuthors"
          v-model:sort="sort"
          :search-string="searchString"
          @refresh-seed="randomizeSeed"
          @input="updateHistoryState"
        ></Filters>
      </div>
    </div>
  </div>
</template>

<script>
import FilterRow from './components/FilterRow';
import AuthorsList from './components/AuthorsList';
import Filters from './components/Filters';
import InitFilters from './components/InitFilters';
import Logo from './components/Logo';
import SearchBox from './components/SearchBox';
import StickyContainer from './components/StickyContainer';
import SearchHistoryManager from '~/components/Search/HistoryManager';
import { mapWritableState, mapActions } from 'pinia';
import useHomepageStore from '~/stores/homepage.js';
import useListStore from '~/stores/list.js';

import gql from 'graphql-tag';

const FETCH_SONG_ROUTE = gql`
  query ($song_number: Int!) {
    song_lyric_number(song_number: $song_number) {
      public_route
    }
  }
`;

const FETCH_SONGBOOK_SONG_ROUTE = gql`
  query ($number: String!) {
    song_lyric_songbook_number(number: $number) {
      public_route
    }
  }
`;

/**
 * Root search component.
 *
 * Toggles 2 views (SearchHome and SearchResults).
 */
export default {
  extends: SearchHistoryManager,

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  data() {
    return {
      showAuthors: false,
      songLoading: false, // song route is currently loading
      urlLoaded: false, // query was loaded from URL
    };
  },

  methods: {
    getTitle() {
      return (
        this.$config.public.variation.title +
        this.$config.public.titleSeparator +
        'chytrý křesťanský zpěvník'
      );
    },

    getDescription() {
      return 'Evangelický zpěvník je projektem Českobratrské církve evangelické.';
    },

    ...mapActions(useListStore, [
      'randomizeSeed',
      'resetBasicSearch',
      'setActiveList',
    ]),

    queryLoaded() {
      this.updateHistoryState();
    },

    inputEnter() {
      // try to open song or administration
      if (this.searchString) {
        let searchParsedToInt = parseInt(this.searchString, 10);

        if (this.searchString == 'admin') {
          window.location.href = this.$config.public.adminUrl;
        } else if (!isNaN(searchParsedToInt)) {
          let query = this.$config.public.variation.filter
            ? {
                query: FETCH_SONGBOOK_SONG_ROUTE,
                variables: {
                  number:
                    this.$config.public.variation.filter.toUpperCase() +
                    ' ' +
                    this.searchString,
                },
              }
            : {
                query: FETCH_SONG_ROUTE,
                variables: {
                  song_number: searchParsedToInt,
                },
              };
          this.songLoading = true;
          this.$apollo
            .query(query)
            .then((response) => {
              let result =
                response.data.song_lyric_number ||
                response.data.song_lyric_songbook_number;

              if (result) {
                this.$router
                  .push({
                    path: result.public_route,
                  })
                  .catch((err) => {});
              }
            })
            .finally(() => {
              this.songLoading = false;
            });
        }
      }
    },
  },

  mounted() {
    this.applyStateChange();
    this.urlLoaded = true;
  },

  components: {
    Logo,
    AuthorsList,
    Filters,
    InitFilters,
    SearchBox,
    FilterRow,
    StickyContainer,
  },

  computed: {
    ...mapWritableState(useHomepageStore, {
      init: 'showDashboard',
    }),

    ...mapWritableState(useListStore, [
      'searchString',
      'filters',
      'sort',
      'seed',
    ]),

    // getter / setter for the SearchHistoryManager extending component
    historyStateObject: {
      get() {
        const showSeed = !(
          this.searchString ||
          this.sort.by ||
          this.showAuthors ||
          this.init
        );

        return {
          searchString: this.searchString,
          filters: this.filters,
          showAuthors: this.showAuthors,
          seed: showSeed ? this.seed : null,
          sort: this.sort,
        };
      },

      set(obj) {
        this.searchString = obj.searchString;
        this.filters = obj.filters;
        this.showAuthors = obj.showAuthors;
        this.sort = obj.sort;

        if (obj.seed) {
          this.seed = obj.seed;
        }
      },
    },
  },

  watch: {
    showAuthors(val) {
      this.resetBasicSearch();
    },
    init(val) {
      if (val) {
        this.setActiveList();
        this.resetBasicSearch();
        this.showAuthors = false;
      } else {
        this.setActiveList('search');
      }

      this.updateHistoryState();
    },
    $route() {
      this.applyStateChange();
      // we intercept route changes this way, because:
      // - beforeRouteUpdate fires before route change
      // - window.onpopstate does not fire for nuxt-links
    },
  },
};
</script>

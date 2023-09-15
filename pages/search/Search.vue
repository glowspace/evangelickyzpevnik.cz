<template>
  <div>
    <Logo v-if="init" />
    <StickyContainer :onDashboard="init">
      <SearchBox
        v-model="search_string"
        :onDashboard="init"
        @enter="inputEnter"
        @focus="init = false"
        @back="
          init = true;
          resetState(true);
        "
      />
      <FilterRow v-if="!init">
        <Filters
          v-model:selected-songbooks="selected_songbooks"
          v-model:selected-tags="selected_tags"
          v-model:selected-languages="selected_languages"
          v-model:show-authors="showAuthors"
          v-model:sort="sort"
          v-model:descending="descending"
          :search-string="search_string"
          @refresh-seed="refreshSeed"
          @input="updateHistoryState"
        ></Filters>
      </FilterRow>
    </StickyContainer>
    <InitFilters
      v-if="init"
      v-model="selected_tags"
      @update:modelValue="init = false"
    ></InitFilters>
    <div class="text-center mt-1">
      <BasicButton
        v-if="init"
        @click="init = false"
        icon-name="add"
        class="text-primary -ml-3"
        text
        >Zobrazit všechy písně</BasicButton
      >
    </div>
    <!-- todo: news -->
    <!-- <div class="row justify-content-center text-center pt-4" v-show="init">
      <div class="col-lg-8 search-column">
        <News><div class="news-opener" @click="init = false"></div></News>
      </div>
      <div class="col-lg-4 search-balance"></div>
    </div> -->
    <div v-show="!init">
      <!-- <News v-show="!filters_active && !search_string" /> -->
      <SongsList
        v-if="!showAuthors"
        :search-string="search_string"
        :selected-tags="selected_tags"
        :selected-songbooks="selected_songbooks"
        :selected-languages="selected_languages"
        :sort="parseInt(sort)"
        :descending="descending"
        :seed="parseInt(seed)"
        @query-loaded="queryLoaded"
      ></SongsList>
      <AuthorsList
        v-else
        :search-string="search_string"
        @query-loaded="queryLoaded"
      ></AuthorsList>
    </div>

    <!-- todo: app links -->
    <!-- <app-links v-if="init" /> -->
    <!-- todo: report bug -->
    <!-- <a
      class="btn btn-secondary search-report bg-transparent"
      title="Nahlásit"
      :href="
        'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
        encodeURIComponent($config.public.siteUrl + $route.fullPath)
      "
    >
      <i class="fas fa-exclamation-triangle p-0"></i>
    </a> -->
  </div>
</template>

<script>
import SongsList from './components/SongsList';
import FilterRow from './components/FilterRow';
import AuthorsList from './components/AuthorsList';
import Filters from './components/Filters';
import InitFilters from './components/InitFilters';
import AppLinks from './components/AppLinks';
import Logo from './components/Logo';
import SearchBox from './components/SearchBox';
import StickyContainer from './components/StickyContainer';
import SearchHistoryManager from '~/components/Search/SearchHistoryManager';
import { mapStores } from 'pinia';
import hpStore from '~/stores/homepage.js';

import gql from 'graphql-tag';

const FETCH_SONG_ROUTE = gql`
  query ($song_number: Int!) {
    song_lyric_number(song_number: $song_number) {
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
      // Search data
      search_string: '',
      selected_songbooks: {},
      selected_languages: {},
      selected_tags: {},

      // View state
      // init: true,
      displayFilter: false,
      showAuthors: false,

      // Random order seed
      seed: this.randomInt(1, 100000),
      seedLocked: false,

      // Sort
      sort: 0,
      descending: false,

      // Song route loading
      songLoading: false,
    };
  },

  methods: {
    getTitle() {
      return (
        this.$config.public.siteName +
        this.$config.public.titleSeparator +
        'chytrý křesťanský zpěvník'
      );
    },

    getDescription() {
      return 'Evangelický zpěvník je projektem Českobratrské církve evangelické.';
    },

    resetState(manual = false) {
      this.selected_tags = {};
      this.selected_languages = {};
      this.selected_songbooks = {};
      this.sort = 0;
      this.descending = false;

      if (manual) {
        this.showAuthors = false;
        // if (document.getElementById('search-home')) {
        //   document.getElementById('search-home').focus();
        // }
        this.search_string = ''; // this prevents search box from being cleared after filters' load
        this.refreshSeed();
        this.updateHistoryState();
      }
    },

    queryLoaded() {
      if (this.search_string && this.init) {
        this.updateHistoryState();
        this.init = false;
      } else if (!this.init) {
        this.updateHistoryState();
      }
    },

    inputEnter() {
      this.init = false;
      if (this.search_string) {
        let searchParsedToInt = parseInt(this.search_string, 10);

        if (this.search_string == 'admin') {
          window.location.href = this.$config.public.adminUrl;
        } else if (!isNaN(searchParsedToInt)) {
          this.songLoading = true;
          this.$apollo
            .query({
              query: FETCH_SONG_ROUTE,
              variables: {
                song_number: searchParsedToInt,
              },
            })
            .then((response) => {
              if (response.data.song_lyric_number) {
                this.$router
                  .push({
                    path: response.data.song_lyric_number.public_route,
                  })
                  .catch((err) => {});
              }
              this.songLoading = false;
            })
            .catch((err) => {
              this.songLoading = false;
            });
        }
      }
    },

    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    refreshSeed() {
      this.seedLocked = false;
      this.seed = this.randomInt(1, 100000);
    },
  },

  mounted() {
    window.onpopstate = this.applyStateChange;
    this.applyStateChange();
  },

  components: {
    Logo,
    AppLinks,
    SongsList,
    AuthorsList,
    Filters,
    InitFilters,
    SearchBox,
    FilterRow,
    StickyContainer,
  },

  computed: {
    /**
     * Note that there has to be sth together at the line with return,
     * otherwise js will see only return; and don't give a f*ck about the things below.
     *
     * @returns {boolean}
     */
    filters_active() {
      return (
        Object.keys(this.selected_songbooks).length +
          Object.keys(this.selected_tags).length +
          Object.keys(this.selected_languages).length >
        0
      );
    },

    ...mapStores(hpStore),
    init: {
      get() {
        return this.homepageStore.showDashboard;
      },
      set(val) {
        this.homepageStore.showDashboard = val;
      },
    },

    // getter / setter for the SearchHistoryManager extending component
    historyStateObject: {
      get() {
        this.seedLocked = !(
          this.search_string ||
          this.sort ||
          this.showAuthors ||
          this.init
        );

        return {
          search_string: this.search_string,
          tags: this.selected_tags,
          languages: this.selected_languages,
          songbooks: this.selected_songbooks,
          show_authors: this.showAuthors,
          seed: this.seedLocked ? this.seed : null,
          is_descending: this.search_string ? null : this.descending,
          sort: this.search_string ? null : this.sort,
        };
      },

      set(obj) {
        this.search_string = obj.search_string;
        this.selected_tags = obj.tags;
        this.selected_languages = obj.languages;
        this.selected_songbooks = obj.songbooks;
        this.showAuthors = obj.show_authors;
        this.descending = obj.is_descending;
        if (obj.seed) {
          this.seed = obj.seed;
        }
        this.sort = obj.sort;

        if (this.seed && !this.seedLocked) {
          this.seedLocked = true;
          this.updateHistoryState(false);
        }
      },
    },
  },

  watch: {
    showAuthors(val) {
      this.resetState();
    },
    init(val) {
      if (val) {
        this.seedLocked = false;
        this.resetState();
      } else {
        this.seedLocked = true;
        this.updateHistoryState(false);
      }
    },
  },
};
</script>

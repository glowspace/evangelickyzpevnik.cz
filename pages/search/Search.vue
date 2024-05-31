<template>
  <div class="flex flex-row">
    <div :class="{ 'md:w-3/5 xl:w-2/3': !init }" class="w-full">
      <div v-if="init" class="custom-container md:mt-8">
        <Logo />
      </div>
      <StickyContainer :onDashboard="init">
        <div :class="{ 'custom-container': init, 'md:mt-4 lg:mx-5': !init }">
          <SearchBox
            v-model="search_string"
            :on-dashboard="init"
            :search-songs="!showAuthors"
            @enter="inputEnter"
            @focus="init = false"
            @back="
              init = true;
              resetState(true);
            "
          />
          <FilterRow v-if="!init">
            <template #row>
              <Filters
                :is-filter-row="true"
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
            </template>
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
        </div>
      </StickyContainer>
      <div class="custom-container" v-if="init">
        <InitFilters
          v-if="!$config.public.isEvangelicalSongbook"
          v-model="selected_tags"
          @update:modelValue="init = false"
        ></InitFilters>
        <!-- todo: allow filters for EZ -->
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
        class="p-5 sm:grid sm:grid-cols-2 gap-x-7 gap-y-5 space-y-4 sm:space-y-0 lg:mx-[16.5%] max-w-[1400px] mx-auto"
      >
        <DashboardCard title="Digitální zpěvník">
          <BasicClickable
            href="https://play.google.com/store/apps/details?id=cce.evangelicky_zpevnik"
            class="list-item"
          >
            <BasicIcon name="android" class="list-icon" />
            <span>Aplikace pro Android</span>
          </BasicClickable>
          <BasicClickable href="#" class="list-item">
            <BasicIcon name="ios" class="list-icon" />
            <span>Aplikace pro iOS</span>
          </BasicClickable>
          <BasicClickable to="/o-zpevniku" class="list-item">
            <BasicIcon name="newspaper" class="list-icon" />
            <span>Novinky</span>
          </BasicClickable>
          <BasicClickable
            :href="
              'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
              encodeURIComponent($config.public.siteUrl + $route.fullPath)
            "
            class="list-item"
          >
            <BasicIcon name="warning" class="list-icon" />
            <span>Nahlásit chybu</span>
          </BasicClickable>
        </DashboardCard>
        <DashboardCard title="Další možnosti">
          <BasicClickable
            href="https://eshop.e-cirkev.cz/produkty/zpevnik/"
            class="list-item"
          >
            <BasicIcon name="book_2" class="list-icon" />
            <span>Koupit zpěvník</span>
          </BasicClickable>
          <BasicClickable
            to="/materialy"
            class="list-item"
          >
            <BasicIcon name="download" class="list-icon" />
            <span>Materiály ke stažení</span>
          </BasicClickable>
          <BasicClickable
            to="https://soundcloud.com/ecirkev/sets/nov-evangelick-zp-vn-k-2021"
            class="list-item"
          >
            <BasicIcon name="headphones" class="list-icon" />
            <span>Nahrávky písní</span>
          </BasicClickable>
        </DashboardCard>
      </div>
      <div v-show="!init">
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
    <div
      v-if="!init"
      class="hidden md:block sticky top-0 flex-grow-0 w-2/5 xl:w-1/3 p-8 h-screen overflow-auto border-l border-primary-150 bg-surface-50"
    >
      <div>
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
      </div>
    </div>
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
import useHomepageStore from '~/stores/homepage.js';

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
      showAuthors: false,

      // Random order seed
      seed: this.randomInt(1, 100000),
      seedLocked: false, // seed is shown in url

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
      this.search_string = '';

      if (manual) {
        this.showAuthors = false;
        this.refreshSeed();
        this.updateHistoryState();
      }
    },

    queryLoaded() {
      this.updateHistoryState();
    },

    inputEnter() {
      // try to open song or administration
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
    ...mapStores(useHomepageStore),
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
        this.updateHistoryState();
      }
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

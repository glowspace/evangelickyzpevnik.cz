<template>
  <!-- todo: refactor so that it does not need client-only wrapper -->
  <!-- <client-only> -->
  <div class="mb-4">
    <LoaderLinear
      :class="[{ 'opacity-0': results_loaded }, 'transition-opacity']"
    />
    <table class="w-full">
      <tbody>
        <tr v-if="!results_loaded && !(song_lyrics && song_lyrics.length)">
          <td class="pl-8 pr-3 w-5">
            <LoaderCircular size="5" />
          </td>
          <td>Načítám…</td>
          <td class="p-2 text-right pr-7">
            <BasicButton
              :href="
                'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
                encodeURIComponent($config.public.siteUrl + $route.fullPath)
              "
              type="outlined"
            >
              Nahlásit
            </BasicButton>
          </td>
        </tr>
        <template v-else-if="song_lyrics && song_lyrics.length">
          <!-- <tr v-if="displayHistory">
            <td>here we can display a list of last visited songs</td>
          </tr> -->
          <template v-for="song_lyric in song_lyrics" :key="song_lyric.id">
            <SLItem
              :song_lyric="song_lyric"
              :number="getSongNumber(song_lyric)"
              :special-number="getSongNumber(song_lyric, true)"
              is-search
            />
          </template>
          <tr v-if="results_loaded">
            <td class="p-0 border-top-0">
              <scroll-trigger
                @triggerIntersected="loadMore"
                @noObserver="caniuseObserver = false"
                :enabled="enable_more"
              />
            </td>
          </tr>
        </template>
        <tr v-else-if="results_loaded">
          <td class="p-1" colspan="7">
            <span class="px-3 py-2 inline-block"
              >Žádná píseň odpovídající zadaným kritériím nebyla nalezena.</span
            >
            <BasicButton
              :href="'https://forms.gle/AYXXxkWtDHQQ13856'"
              type="outlined"
              class="mx-3 float-right"
            >
              Přidat píseň
            </BasicButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center my-2" v-if="enable_more && results_loaded">
      <div class="inline-flex items-center uppercase text-sm" @click="loadMore">
        <LoaderCircular v-if="caniuseObserver" class="mr-3" />
        {{ caniuseObserver ? 'Načítám' : 'Načíst' }} další výsledky (celkem
        {{ song_lyrics_paginated.paginatorInfo.total }})
      </div>
    </div>
  </div>
  <!-- </client-only> -->
</template>

<script>
import gql from 'graphql-tag';
import ScrollTrigger from '~/components/Search/ScrollTrigger';
import buildElasticSearchParams, {
  getSelectedTagsDcnf,
} from '~/components/Search/buildElasticSearchParams';
import mergeFetchMoreResult from '~/components/Search/mergeFetchMoreResult';
import { fetchFiltersQuery } from './fetchFiltersQuery.graphql';
import SLItem from './SLItem';
import lodash from 'lodash';
const { isEmpty } = lodash; // lodash is CommonJS, therefore we can't do `import { xyz } from 'lodash';`

// Query
const FETCH_ITEMS = gql`
  query ($search_params: String, $page: Int, $per_page: Int) {
    song_lyrics_paginated: search_song_lyrics(
      search_params: $search_params
      page: $page
      per_page: $per_page
    ) {
      data {
        id
        song_number
        ez_number
        name
        secondary_name_1
        secondary_name_2
        public_route
        lang
        lang_string
        scores: externals(content_type: SCORE) {
          id
        }
        recordings: externals(content_type: RECORDING) {
          id
        }
        authors_pivot {
          pivot {
            author {
              id
              name
              public_route
            }
            authorship_type
          }
        }
        tags {
          id
        }
        has_chords
        has_lyrics
        songbook_records {
          pivot {
            number
            songbook {
              id
              name
              shortcut
            }
          }
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        total
        hasMorePages
      }
    }
  }
`;

export default {
  props: {
    searchString: {
      type: String,
      default: '',
    },

    selectedSongbooks: Object,
    selectedTags: Object,
    selectedLanguages: Object,

    // todo: refactor `sort` to String (or a kind of enum)
    sort: Number,
    descending: Boolean,
    seed: Number,

    showArrangements: {
      type: Boolean,
      default: false,
    },
    showRegenschori: {
      type: Boolean,
      default: false,
    },
  },

  components: { ScrollTrigger, SLItem },

  data() {
    return {
      page: 1,
      per_page: 20,
      enable_more: true,
      results_loaded: false,
      preferred_songbook_id: null,
      caniuseObserver: true,
      loadedMore: false,
    };
  },

  computed: {
    searchParams() {
      return buildElasticSearchParams({
        searchString: this.searchString,
        filterTagsDcnf: getSelectedTagsDcnf(
          {
            generic: this.tags_generic,
            liturgy_part: this.tags_liturgy_part,
            liturgy_period: this.tags_liturgy_period,
            saints: this.tags_saints,
            sacred_occasion: this.tags_sacred_occasion,
          },
          this.selectedTags
        ),
        filterLanguages: this.selectedLanguages,
        filterSongbooks: this.selectedSongbooks,
        sortType: [
          'RANDOM',
          'NAME',
          this.preferred_songbook_id === null ? 'NUMBER' : 'SONGBOOK_NUMBER',
        ][this.sort],
        sortConfig: {
          seed: this.seed,
          songbook_id: this.preferred_songbook_id,
          is_descending: this.descending,
        },
        filterConfig: {
          show_regenschori: this.showRegenschori,
          show_arrangements: this.showArrangements,
        },
      });
    },

    song_lyrics() {
      return this.song_lyrics_paginated ? this.song_lyrics_paginated.data : [];
    },

    displayHistory() {
      return (
        this.searchString == '' &&
        isEmpty(this.selectedSongbooks) &&
        isEmpty(this.selectedTags) &&
        isEmpty(this.selectedLanguages)
      );
    },
  },

  methods: {
    async loadMore() {
      this.loadedMore = true;
      this.page++;

      try {
        await this.$apollo.queries.song_lyrics_paginated.fetchMore({
          variables: {
            page: this.page,
            per_page: this.per_page,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { hasMorePages, mergedResult } = mergeFetchMoreResult(
              previousResult,
              fetchMoreResult
            );
            this.enable_more = hasMorePages;

            return mergedResult;
          },
        });
      } catch (e) {
        return e;
      }
    },

    getSongNumber(song_lyric, onlySpecial = false) {
      const rec = this.getSongbookRecordForNumber(song_lyric);

      if (onlySpecial) {
        return rec ? rec.pivot.number : '';
      }

      if (rec) {
        return rec.pivot.songbook.shortcut + ' ' + rec.pivot.number;
      }

      return String(
        this.$config.public.isEvangelicalSongbook
          ? song_lyric.ez_number
          : song_lyric.song_number
      );
    },

    getSongbookRecordForNumber(song_lyric) {
      if (this.preferred_songbook_id !== null) {
        let rec = song_lyric.songbook_records.find(
          (record) => record.pivot.songbook.id === this.preferred_songbook_id
        );

        if (rec && rec.pivot.number && rec.pivot.songbook.shortcut) {
          return rec;
        }
      }

      return null;
    },
  },

  // GraphQL client
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
    song_lyrics_paginated: {
      query: FETCH_ITEMS,
      variables() {
        return {
          search_params: this.searchParams,
          page: 1,
          per_page: this.per_page,
        };
      },
      // debounce waits 200ms for query refetching
      debounce: 200,
      result(result) {
        this.$emit('query-loaded', null);
        this.enable_more =
          result.data.song_lyrics_paginated.paginatorInfo.hasMorePages;
        this.results_loaded = true;

        // when the graphql result is cached, then currentPage is higher than 1 at component mounting
        // this needs to get mirrored in the local page property
        // we also have to check if the user has fired loadMore event as otherwise he could accidentally fetch one page multiple times
        if (!this.loadedMore) {
          this.page =
            result.data.song_lyrics_paginated.paginatorInfo.currentPage;
        }
      },
    },
  },

  watch: {
    searchParams() {
      this.page = 1;
      this.results_loaded = false;
    },

    selectedSongbooks: {
      handler(val) {
        let arr = Object.keys(val);
        if (arr.length == 1) {
          this.preferred_songbook_id = arr[0];
        } else {
          this.preferred_songbook_id = null;
        }
      },
      deep: true,
    },
  },
};
</script>

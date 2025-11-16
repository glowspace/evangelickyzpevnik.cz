<template>
  <div class="mb-4">
    <LoaderLinear
      :class="[{ 'opacity-0': results_loaded || !loading_bar }, 'transition-opacity']"
    />
    <table class="w-full">
      <tbody>
        <tr v-if="!results_loaded && !(song_lyrics && song_lyrics.length)">
          <td class="pl-8 pr-3 w-5">
            <LoaderCircular size="5" />
          </td>
          <td>Načítám…</td>
          <td class="p-2 text-right pr-7">
            <BasicButton :href="getReportLink()" type="outlined"> Nahlásit </BasicButton>
          </td>
        </tr>
        <template v-else-if="song_lyrics && song_lyrics.length">
          <!-- <tr v-if="displayHistory">
            <td>here we can display a list of last visited songs</td>
          </tr> -->
          <template v-for="song_lyric in song_lyrics" :key="song_lyric.id">
            <SongListItem
              :song_lyric="song_lyric"
              :songbook-id="preferred_songbook_id"
              :force-number="
                preferred_songbook_id != $config.public.variation.songbook || sort == 2
              "
              :is-search="!compact"
            />
          </template>
          <tr v-if="results_loaded">
            <td class="p-0 border-top-0">
              <SearchScrollTrigger
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
</template>

<script>
import gql from 'graphql-tag';
import buildElasticSearchParams, {
  getSelectedTagsDcnf,
} from '~/components/Search/buildElasticSearchParams';
import mergeFetchMoreResult from '~/components/Search/mergeFetchMoreResult';
import tagsFilters from '../../pages/search/components/tagsFilters';
import { SongListItemFragment } from './ListItem';
import { isEmpty } from 'lodash-es';

// Query
const FETCH_ITEMS = gql`
  query ($search_params: String, $page: Int, $per_page: Int) {
    song_lyrics_paginated: search_song_lyrics(
      search_params: $search_params
      page: $page
      per_page: $per_page
    ) {
      data {
        ...SongListItemFragment
        song_number
        scores: externals(content_type: SCORE) {
          id
        }
        recordings: externals(content_type: RECORDING) {
          id
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

  ${SongListItemFragment}
`;

export default {
  props: {
    searchString: {
      type: String,
      default: '',
    },
    filters: Object,
    // todo: refactor `sort.by` to String (or a kind of enum)
    sort: Object,
    seed: Number,
    compact: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      page: 1,
      per_page: 20,
      enable_more: true,
      results_loaded: false,
      loading_bar: false,
      preferred_songbook_id: this.$config.public.variation.songbook,
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
          this.filters.tags
        ),
        filterLanguages: this.filters.languages,
        filterSongbooks: this.filters.songbooks,
        sortType: [
          'RANDOM',
          'NAME',
          this.preferred_songbook_id == null ? 'NUMBER' : 'SONGBOOK_NUMBER',
        ][this.sort.by],
        sortConfig: {
          seed: this.seed,
          songbook_id: this.preferred_songbook_id,
          is_descending: this.sort.desc,
        },
        filterConfig: {
          show_regenschori: true, // regenschori filtering is not set up
          show_arrangements: this.$config.public.variation.showArrangements,
        },
      });
    },

    song_lyrics() {
      return this.song_lyrics_paginated ? this.song_lyrics_paginated.data : [];
    },

    displayHistory() {
      return (
        this.searchString == '' &&
        isEmpty(this.filters.songbooks) &&
        isEmpty(this.filters.tags) &&
        isEmpty(this.filters.languages)
      );
    },

    selectedSongbooks() {
      return this.filters.songbooks;
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
  },

  // GraphQL client
  apollo: {
    $prefetch: false,
    ...tagsFilters,
    song_lyrics_paginated: {
      query: FETCH_ITEMS,
      variables() {
        return {
          search_params: this.searchParams,
          page: 1,
          per_page: this.per_page,
        };
      },
      debounce: 1, // 1ms debounce probably makes the page switching faster
      result(result) {
        this.$emit('query-loaded', null);
        this.enable_more = result.data.song_lyrics_paginated.paginatorInfo.hasMorePages;
        this.results_loaded = true;

        // when the graphql result is cached, then currentPage is higher than 1 at component mounting
        // this needs to get mirrored in the local page property
        // we also have to check if the user has fired loadMore event as otherwise he could accidentally fetch one page multiple times
        if (!this.loadedMore) {
          this.page = result.data.song_lyrics_paginated.paginatorInfo.currentPage;
        }
      },
      watchLoading(isLoading, countModifier) {
        this.loading_bar = isLoading;
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
          this.preferred_songbook_id = this.$config.public.variation.songbook;
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <TopBar
    @back="previous ? $router.back() : navigateTo('/')"
    :title="song_lyric ? String(song_lyric?.song_number) : 'načítám…'"
  >
    <div class="kebab-wrapper" @focusout="kebabWrapperBlurred">
      <BasicButton
        icon="more_vert"
        class="kebab-opener"
        icon-only
        text
        @click="kebabClicked"
      />
      <Kebab v-if="song_lyric" :song_lyric="song_lyric" :opened="kebabOpened" />
    </div>
  </TopBar>
  <song-loading v-if="$apollo.loading"></song-loading>
  <song-detail v-else-if="song_lyric" :song="song_lyric"></song-detail>
</template>

<script>
import gql from 'graphql-tag';
import SongDetail from './SongDetail';
import SongLoading from './SongLoading';
import Kebab from './components/Kebab';
import { getFullName } from '~/components/SongName';
import Bowser from 'bowser';

const VISIT_SONG = gql`
  mutation (
    $song_lyric_id: Int!
    $is_mobile: Boolean
    $visit_type: VisitType!
  ) {
    visit_song(
      song_lyric_id: $song_lyric_id
      source: PROSCHOLY
      is_mobile: $is_mobile
      visit_type: $visit_type
    ) {
      confirmed
    }
  }
`;

const FETCH_SONG_LYRIC = gql`
  query ($id: ID!) {
    song_lyric(id: $id) {
      has_lyrics
      id
      song_number
      name
      secondary_name_1
      secondary_name_2
      public_route
      type
      lyrics_no_chords
      bible_refs_src
      lilypond_svg
      lang
      lang_string
      licence_type_cc
      licence_type_cc_string_values
      arrangements {
        id
      }
      authors_pivot {
        pivot {
          author {
            ...authorFields
          }
          authorship_type
        }
      }
      externals {
        id
        url
        media_id
        caption
        is_uploaded
        tags_instrumentation {
          id
          name
        }
        content_type
        content_type_string
        media_type
        authors {
          ...authorFields
        }
      }
      song {
        song_lyrics {
          id
          name
          secondary_name_1
          secondary_name_2
          public_route
          type
          authors_pivot {
            pivot {
              author {
                ...authorFields
              }
              authorship_type
            }
          }
          has_lyrics
          lang
          lang_string
        }
      }
      capo
      songbook_records {
        pivot {
          number
          songbook {
            id
            name
            shortcut
            # used to filter out private songbooks
            # todo: use server-side filtering
            is_private
          }
        }
      }
      is_approved_for_liturgy
      tags_liturgy_part {
        id
        name
      }
      tags_generic {
        id
        name
      }
      tags_liturgy_period {
        id
        name
      }
      tags_saints {
        id
        name
      }
      tags_sacred_occasion {
        id
        name
      }
    }
  }

  fragment authorFields on Author {
    id
    name
    public_route
  }
`;

export default {
  name: 'Song',
  components: { SongLoading, SongDetail, Kebab },

  data() {
    return {
      previous: '',
      kebabOpened: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component public instance via `vm`
      vm.previous = from.fullPath;
    });
  },

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
    kebabClicked() {
      this.kebabOpened = !this.kebabOpened;
    },

    kebabWrapperBlurred(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.kebabOpened = false;
      }
    },

    getTitle() {
      return (
        (this.song_lyric ? getFullName(this.song_lyric) : 'Píseň') +
        this.$config.public.titleSeparator +
        this.$config.public.siteName
      );
    },

    getDescription() {
      if (this.song_lyric) {
        let lyrics = this.song_lyric.lyrics_no_chords;
        lyrics = lyrics.replace(/\n{2,}/g, ' // ');
        lyrics = lyrics.replace(/([.:,;!?])\s*\n/g, '$1 ');
        lyrics = lyrics.replace(/\n/g, ' / ');
        lyrics = lyrics.replace(/\s+/g, ' ');
        lyrics = lyrics.substring(0, 300);
        return lyrics;
      }
      return 'I tuto píseň máme ve Zpěvníku pro scholy.';
    },

    notifySongVisit(visit_type) {
      if (this.$route.params.id) {
        this.$apollo.mutate({
          mutation: VISIT_SONG,
          variables: {
            // todo: detect desktop/mobile on server side
            is_mobile: process.client ? this.isMobileBrowser() : null,
            song_lyric_id: parseInt(this.$route.params.id),
            visit_type: visit_type,
          },
        });
      }
    },

    isMobileBrowser() {
      return (
        Bowser.getParser(window.navigator.userAgent).getPlatformType() ===
        'mobile'
      );
    },
  },

  apollo: {
    song_lyric: {
      query: FETCH_SONG_LYRIC,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },

  mounted() {
    if (!this.$apollo.loading) {
      if (this.song_lyric === null) {
        // this.$nuxt.error({ statusCode: 404 });
        // https://nuxt.com/docs/getting-started/error-handling#createerror
        throw createError({
          statusCode: 404,
          statusMessage: 'Page Not Found',
          fatal: true,
        });
      } else if (
        this.song_lyric &&
        window.location.pathname != this.song_lyric.public_route
      ) {
        window.history.replaceState(null, '', this.song_lyric.public_route);
      }
    }

    // todo: notify when SSR (this works only on client)

    setTimeout(() => {
      this.notifySongVisit('GENERIC');
    }, 2000);

    setTimeout(() => {
      this.notifySongVisit('LONG');
    }, 20000);
  },
};
</script>

<style lang="postcss">
.song-part {
  --indent-space: 1.5em;
  margin-left: var(--indent-space);
}

.song-line {
  position: relative;
}

.song-line--comment {
  color: #767676;
  font-style: italic;
  font-weight: 300;
}

span.song-part-tag {
  min-width: var(--indent-space);
  margin-left: calc(var(--indent-space) * -1);
  display: inline-block;
}

.song-lyrics:not(.song-lyrics-extended) .song-part-hidden {
  display: none;
}

.song-lyrics:not(.song-lyrics-extended) .song-part-hidden-text {
  margin-bottom: 1em;

  .song-line:not(:first-child) > *:not(.song-part-tag),
  .song-line:first-child .chord {
    display: none;
  }
}

.chord {
  position: relative;
  display: inline-block;

  &-sign {
    display: flex;
    justify-content: flex-start;
    transition: 100ms;
    margin-bottom: -0.4em;
    color: #1d6dab;
  }

  &-base {
    font-weight: 500;
    margin-right: 0.4em;
  }

  &-variant {
    position: relative;
    left: -0.4em;
  }

  &-extension {
    font-size: 0.8em;
    position: relative;
    left: -0.4em;
  }

  &-bass {
    color: #6b78af;
    margin-right: 0.4em;
    margin-left: -0.35em;
  }

  &-right-bracket {
    margin-left: -0.4em;
    margin-right: 0.4em;
  }

  &-text {
    display: inline-block;
    position: relative;
    background: white;
    z-index: 2;
    /*
    // todo: refactor to be usable
    // was not working with ___ lines etc.. (see Abba Otce for example)

    // &:not(.chord-text-spaced):after {
    //      font-weight: bold;
    //     content: "-";
    //     position: absolute;
    //     user-select: none;
    // }*/
  }

  /*// &-text-spaced {
  // margin-right: 0.5em;
  // }*/

  &-line {
    display: block;
    position: relative;
    width: calc(100% - 0.6em);
    height: 1px;
    border-bottom: 1px solid #b9b9b9;
    top: -0.5em;
    right: -0.5em;
    user-select: none;
  }
}

.song-part-inline .chord-text {
  display: none;
}
</style>

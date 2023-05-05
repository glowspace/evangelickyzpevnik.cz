<template>
  <song-loading v-if="$apollo.loading"></song-loading>
  <song-detail v-else-if="song_lyric" :song="song_lyric"></song-detail>
</template>

<script>
import gql from 'graphql-tag';
import SongDetail from './SongDetail';
import SongLoading from './SongLoading';
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
  components: { SongLoading, SongDetail },

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
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
        this.$nuxt.error({ statusCode: 404 });
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

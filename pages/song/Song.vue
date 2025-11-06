<template>
  <div class="flex flex-col min-h-screen items-stretch">
    <TopBar :title="topBarTitle">
      <Kebab
        v-if="song_lyric"
        :items="[
          {
            label: 'Nahlásit',
            icon: 'warning',
            href:
              'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
              encodeURIComponent($config.public.siteUrl + $route.fullPath),
          },
          {
            label: 'Upravit',
            icon: 'edit',
            href: $config.public.adminUrl + '/song/' + song_lyric.id + '/edit',
          },
          {
            label: 'Tisk',
            icon: 'print',
            href: 'javascript:window.print()',
          },
        ]"
      />
    </TopBar>
    <song-loading v-if="$apollo.loading"></song-loading>
    <song-detail v-else-if="song_lyric" :song="song_lyric"></song-detail>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SongDetail from './SongDetail';
import SongLoading from './SongLoading';
import Kebab from '~/components/Kebab';
import { getFullName } from '~/components/SongName';
import Bowser from 'bowser';
import { SongListItemFragment } from '~/components/Song/ListItem';

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
      has_chords
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
      external_rendered_scores {
        public_url
      }
      lang
      lang_string
      licence_type_cc
      licence_type_cc_string_values
      hymnology
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
          ...SongListItemFragment
        }
      }
      capo
      songbook_records {
        pivot {
          number
          song_name
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

  ${SongListItemFragment}

  fragment authorFields on Author {
    id
    name
    public_route
  }
`;

export default {
  name: 'Song',
  components: { SongLoading, SongDetail, Kebab },

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
    getTitle() {
      return (
        (this.song_lyric
          ? getFullName(this.song_lyric, this.$config.public.variation.songbook)
          : 'Píseň') +
        this.$config.public.titleSeparator +
        this.$config.public.variation.title
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
        this.$apollo?.mutate({
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

  computed: {
    topBarTitle() {
      return this.song_lyric
        ? String(
            this.$config.public.variation.songbook == null
              ? this.song_lyric?.song_number
              : this.songbookNumber
          )
        : 'načítám…';
    },

    songbookNumber() {
      return this.song_lyric.songbook_records.find(
        (record) =>
          record.pivot.songbook.id == this.$config.public.variation.songbook
      )?.pivot.number;
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
      result(result) {
        if (result.data.song_lyric === null) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
            fatal: true,
          });
        }
      },
    },
  },

  mounted() {
    if (!this.$apollo.loading) {
      if (
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
  @apply font-custom-light;
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
    @apply font-custom-medium;
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

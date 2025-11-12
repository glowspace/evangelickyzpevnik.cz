<template>
  <div class="custom-container">
    <div class="m-5">
      <div class="print:hidden">
        <div class="-mx-1">
          <BasicChip
            v-if="scores.length || otherExternals.length"
            :class="[{ active: topMode == 1 }]"
            class="pl-2 font-custom-medium"
            @click="topMode = topMode == 1 ? 0 : 1"
          >
            <BasicIcon
              name="audio_file"
              :fill="topMode == 1"
              class="text-primary"
            />
            <span v-if="scores.length && otherExternals.length"
              >Noty, materiály</span
            >
            <span v-else-if="scores.length">Noty</span>
            <span v-else>Materiály</span>
          </BasicChip>
          <BasicChip
            v-if="renderTranslations"
            class="pl-2 font-custom-medium"
            :class="{ active: topMode == 2 }"
            @click="topMode = topMode == 2 ? 0 : 2"
          >
            <BasicIcon name="translate" class="text-primary" />
            <span>Překlady</span>
          </BasicChip>
          <BasicChip
            v-if="hasArrangements"
            class="pl-2 font-custom-medium"
            :href="$config.public.regenschoriUrl + song_lyric.public_route"
          >
            <BasicIcon name="edit_note" class="text-primary" />
            <span>Aranže</span>
          </BasicChip>
          <BasicChip
            v-if="
              (hasTags || publicSongbookRecords.length) &&
              !$config.public.variation.hideTags
            "
            class="pl-2 font-custom-medium"
            :class="{ active: topMode == 3 }"
            @click="topMode = topMode == 3 ? 0 : 3"
          >
            <BasicIcon name="sell" :fill="topMode == 3" class="text-primary" />
            <span v-if="hasTags && publicSongbookRecords.length"
              >Štítky, zpěvníky</span
            >
            <span v-else-if="hasTags">Štítky</span>
            <span v-else>Zpěvníky</span>
          </BasicChip>
          <BasicChip
            v-if="song_lyric.hymnology"
            class="pl-2 font-custom-medium"
            :class="{ active: topMode == 4 }"
            @click="topMode = topMode == 4 ? 0 : 4"
          >
            <BasicIcon name="info" :fill="topMode == 4" class="text-primary" />
            <span>O písni</span>
          </BasicChip>
        </div>

        <!-- scores -->
        <TopBox
          :active="topMode === 1"
          @close="topMode = 0"
          title="Noty a materiály"
        >
          <div class="mb-3" v-if="!$apollo.loading">
            <div
              v-if="scores.length && otherExternals.length"
              class="px-6 py-2 font-custom-medium text-primary"
            >
              Noty
            </div>
            <external
              v-for="(external, index) in scores"
              :key="index"
              :index="index"
              :external="external"
              :song-name="song_lyric.name"
              line
            ></external>
            <div
              v-if="scores.length && otherExternals.length"
              class="px-6 pb-2 pt-5 font-custom-medium text-greendark"
            >
              Další materiály
            </div>
            <external
              v-for="(external, index) in otherExternals"
              :key="index"
              :index="index"
              :external="external"
              :song-name="song_lyric.name"
              line
            ></external>
          </div>
        </TopBox>
        <!-- translations -->
        <TopBox
          :active="topMode === 2"
          @close="topMode = 0"
          title="Seznam jazykových verzí"
        >
          <div class="px-3 pb-3">
            <Translations
              v-if="!$apollo.loading && renderTranslations"
              :song_lyric="song_lyric"
            />
          </div>
        </TopBox>
        <!-- tags -->
        <TopBox
          :active="topMode === 3"
          @close="topMode = 0"
          title="Štítky a zpěvníky"
        >
          <div class="px-5 pb-5" v-if="!$apollo.loading">
            <tags :song="song_lyric"></tags>
          </div>
        </TopBox>
        <!-- info (hymnology) -->
        <TopBox :active="topMode === 4" @close="topMode = 0" title="O písni">
          <div class="px-5 pb-3" v-if="!$apollo.loading">
            <p v-for="line in song_lyric.hymnology.split('\n')" class="mb-2">
              {{ line }}
            </p>
          </div>
        </TopBox>
      </div>
      <div>
        <div class="my-4 overflow-hidden">
          <div
            id="song-lyrics"
            :class="{
              'song-lyrics': true,
              'song-lyrics-extended': !chordSharedStore.simpleView,
            }"
          >
            <!-- MusicXML is preferred -->
            <!-- todo: let the user select if they prefer lilypond or mxl -->
            <div
              v-if="
                song_lyric.lilypond_svg &&
                !song_lyric.external_rendered_scores[0]?.public_url
              "
              v-html="song_lyric.lilypond_svg"
              class="mb-3 lilypond-container"
            ></div>
            <img
              v-if="song_lyric.external_rendered_scores[0]?.public_url"
              :src="song_lyric.external_rendered_scores[0]?.public_url"
              class="mb-3 external-score"
            />
            <span v-if="song_lyric.has_lyrics">
              <div
                v-if="
                  !$apollo.loading &&
                  song_lyric.capo > 0 &&
                  chordSharedStore.showChords
                "
                class="mb-2"
              >
                <i>capo: {{ song_lyric.capo }}</i>
              </div>
              <!-- here goes the song lyrics -->
              <song-lyric-parts
                :song-id="song_lyric.id"
                :font-size-percent="chordSharedStore.fontSizePercent"
                @loaded="checkScroll(true)"
              ></song-lyric-parts>
            </span>
            <span
              v-else
              :style="{
                fontSize: chordSharedStore.fontSizePercent + '%',
              }"
              >Text písně připravujeme.</span
            >
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  </div>
  <div class="grow"><!-- ensures that the bottom bar is always at the bottom --></div>
  <BottomBar
    @tools="showTools = true"
    @media="
      loadMedia = true;
      showMedia = true;
    "
    :scrollable="scrollable"
    :media-available="recordings.length"
    :show-tools-badge="!!chordSharedStore.transposition"
  >
    <PageBottomSheets v-model="showTools" title="Nástroje" position-absolute>
      <div
        v-if="song_lyric.has_chords"
        :class="{
          'opacity-40 pointer-events-none': !chordSharedStore.showChords,
        }"
      >
        <transposition v-model="chordSharedStore.transposition"></transposition>
      </div>

      <div
        v-if="song_lyric.has_chords"
        :class="{
          'opacity-40 pointer-events-none': !chordSharedStore.showChords,
        }"
      >
        <chord-sharp-flat
          v-model="chordSharedStore.useFlatScale"
        ></chord-sharp-flat>
      </div>

      <div>
        <simple-view v-model="chordSharedStore.simpleView"></simple-view>
      </div>

      <div v-if="song_lyric.has_chords">
        <chord-mode v-model="chordSharedStore.showChords"></chord-mode>
      </div>

      <div>
        <font-sizer v-model="chordSharedStore.fontSizePercent"></font-sizer>
      </div>

      <no-sleep />
    </PageBottomSheets>

    <PageBottomSheets v-model="showMedia" title="Nahrávky" position-absolute>
      <div
        v-if="hasExternals && loadMedia && !$apollo.loading"
        class="flex flex-col sm:grid grid-cols-2 gap-5"
      >
        <div v-for="(external, index) in recordings" :key="index">
          <external
            :line="false"
            :index="index"
            :external="external"
            :song-name="song_lyric.name"
          ></external>
        </div>
      </div>
    </PageBottomSheets>
  </BottomBar>
</template>

<script>
import { debounce } from 'lodash-es';
import { mapStores } from 'pinia';
import useChordStore from '~/stores/chord.js';

import FontSizer from './FontSizer';
import ChordMode from './ChordMode';
import SimpleView from './SimpleView';
import ChordSharpFlat from './ChordSharpFlat';
import Transposition from './Transposition';
import Translations from './Translations';
import TopBox from './TopBox';
import BottomBar from './BottomBar';
import NoSleep from './NoSleep';
import SongLyricParts from '../Renderer/SongLyricParts';
import Tags from '../Tags';

/**
 * This component renders white box on song detail page.
 *
 * It contains lyrics and another stuff.
 */
export default {
  props: ['song_lyric'],

  components: {
    FontSizer,
    ChordMode,
    SimpleView,
    ChordSharpFlat,
    Transposition,
    SongLyricParts,
    Tags,
    Translations,
    TopBox,
    BottomBar,
    NoSleep,
  },

  data() {
    // use this only in SongBox and Chord component
    // use v-model to bind data from every other component
    return {
      controlsDisplay: true,
      showTools: false,
      showMedia: false,
      loadMedia: false, // prevents loading iframes when user doesn't want them
      topMode: 0,
      scrollable: true,
    };
  },

  computed: {
    ...mapStores(useChordStore), // store content accessible by id + 'Store', which equals this.chordSharedStore here

    hasExternals: {
      get() {
        return (
          this.song_lyric &&
          this.song_lyric.externals &&
          this.song_lyric.externals.length
        );
      },
    },

    hasArrangements: {
      get() {
        return (
          this.song_lyric &&
          this.song_lyric.arrangements &&
          this.song_lyric.arrangements.length
        );
      },
    },

    recordings: {
      get() {
        return this.song_lyric.externals.filter(
          (ext) => ext.content_type == 'RECORDING'
        );
      },
    },

    scores: {
      get() {
        return this.song_lyric.externals.filter(
          (ext) => ext.content_type == 'SCORE'
        );
      },
    },

    otherExternals: {
      get() {
        return this.song_lyric.externals.filter(
          (ext) =>
            ext.content_type != 'RECORDING' && ext.content_type != 'SCORE'
        );
      },
    },

    renderTranslations: {
      get() {
        // if SongLyric is an arrangement, then .song property is undefined
        return (
          this.song_lyric.song && this.song_lyric.song.song_lyrics.length > 1
        );
      },
    },

    hasTags: {
      get() {
        return (
          this.song_lyric.is_approved_for_liturgy ||
          this.song_lyric.bible_refs_src ||
          this.song_lyric.tags_liturgy_part.length +
            this.song_lyric.tags_generic.length +
            this.song_lyric.tags_liturgy_period.length +
            this.song_lyric.tags_saints.length +
            this.song_lyric.tags_sacred_occasion.length
        );
      },
    },

    publicSongbookRecords() {
      return this.song_lyric.songbook_records.filter(
        (sb) => !sb.pivot.songbook.is_private
      );
    },

    mediaTypes: {
      get() {
        var arrayOfTypes = [
          'spotify',
          'soundcloud',
          'youtube',
          'file/mp3',
          'file/wav',
          'file/aac',
          'file/flac',
        ];
        var returnArray = [];
        for (let i = 0; i < arrayOfTypes.length; i++) {
          returnArray[i] = this.recordings.filter(
            (ext) => ext.media_type == arrayOfTypes[i]
          ).length;
        }
        return returnArray;
      },
    },
  },

  methods: {
    checkScroll(initial) {
      if (import.meta.client && window.innerHeight >= document.body.scrollHeight) {
        // the page isn't scrollable
        this.scrollable = false;

        if (initial === true) {
          // this is the initial check (it was previously used to open toolbox)
        }
      } else {
        this.scrollable = true;
      }
    },
  },

  created() {
    this.debouncedCheckScroll = debounce(this.checkScroll, 200);
    // this prevents transposition from being preserved globally (you want just the one song to be transposed, not the whole songbook)
    this.chordSharedStore.transposition = 0;
    this.chordSharedStore.showChords = this.song_lyric.has_chords;
  },

  mounted() {
    if (!this.song_lyric.has_lyrics) {
      if (this.scores.length) {
        this.topMode = 1;
      } else if (this.renderTranslations) {
        this.topMode = 2;
      }

      this.scrollable = false;
    } else {
      window.addEventListener('resize', this.debouncedCheckScroll);
      this.checkScroll(true);
    }
  },

  unmounted() {
    this.debouncedCheckScroll.cancel();
  },
};
</script>

<style lang="postcss">
.lilypond-container svg,
.external-score {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>

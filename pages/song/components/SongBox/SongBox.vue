<template>
  <BottomBar
    class="-ml-5"
    @tools="showTools = true"
    @media="showMedia = true"
    :mediaAvailable="recordings.length"
  />
  <div>
    <div>
      <div class="-mx-1">
        <BasicChip
          v-if="scores.length || otherExternals.length"
          :class="[{ active: topMode == 1 }]"
          class="pl-2 font-medium"
          @click="topMode = topMode == 1 ? 0 : 1"
        >
          <BasicIcon :fill="topMode == 1" class="text-primary"
            >audio_file</BasicIcon
          >
          <span v-if="scores.length && otherExternals.length"
            >Noty, materiály</span
          >
          <span v-else-if="scores.length">Noty</span>
          <span v-else>Materiály</span>
        </BasicChip>
        <BasicChip
          v-if="renderTranslations"
          class="pl-2 font-medium"
          :class="{ active: topMode == 2 }"
          @click="topMode = topMode == 2 ? 0 : 2"
        >
          <BasicIcon class="text-primary">translate</BasicIcon>
          <span>Překlady</span>
        </BasicChip>
        <BasicChip
          v-if="hasArrangements"
          class="pl-2 font-medium"
          :href="$config.public.regenschoriUrl + song_lyric.public_route"
        >
          <BasicIcon class="text-primary">edit_note</BasicIcon>
          <span>Aranže</span>
        </BasicChip>
        <BasicChip
          v-if="
            hasTags ||
            song_lyric.songbook_records.filter(
              (sb) => !sb.pivot.songbook.is_private
            ).length
          "
          class="pl-2 font-medium"
          :class="{ active: topMode == 3 }"
          @click="topMode = topMode == 3 ? 0 : 3"
        >
          <BasicIcon :fill="topMode == 3" class="text-primary">sell</BasicIcon>
          <span
            v-if="
              hasTags &&
              song_lyric.songbook_records.filter(
                (sb) => !sb.pivot.songbook.is_private
              ).length
            "
            >Štítky, zpěvníky</span
          >
          <span v-else-if="hasTags">Štítky</span>
          <span v-else>Zpěvníky</span>
        </BasicChip>
        <!-- <a
              class="btn float-right"
              title="Nahlásit"
              :href="
                'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
                encodeURIComponent($config.public.baseUrl + $route.fullPath)
              "
            >
              <i class="fas fa-exclamation-triangle p-0"></i>
            </a> -->
      </div>

      <!-- scores -->
      <TopBox
        :active="topMode === 1"
        @close="topMode = 0"
        title="Noty a materiály"
      >
        <table class="table mx-6 mb-6" v-if="!$apollo.loading">
          <tbody>
            <tr v-if="scores.length && otherExternals.length">
              <td colspan="3" class="py-2 font-weight-bold">Noty</td>
            </tr>
            <external
              v-for="(external, index) in scores"
              :key="index"
              :line="true"
              :index="index"
              :external="external"
              :song-name="song_lyric.name"
            ></external>
            <tr v-if="scores.length && otherExternals.length">
              <td colspan="3" class="pb-2 pt-4 font-weight-bold">
                Další materiály
              </td>
            </tr>
            <external
              v-for="(external, index) in otherExternals"
              :key="index"
              :line="true"
              :index="index"
              :external="external"
              :song-name="song_lyric.name"
            ></external>
          </tbody>
        </table>
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
    </div>
    <div>
      <div class="my-4 overflow-hidden">
        <div
          class="d-flex align-items-start justify-content-between flex-column-reverse flex-sm-row"
        >
          <div
            id="song-lyrics"
            :class="{
              'p-1': true,
              'flex-grow-1': true,
              'song-lyrics': true,
              'song-lyrics-extended': chordSharedStore.chordMode == 2,
            }"
          >
            <div
              v-if="song_lyric.lilypond_svg"
              v-html="song_lyric.lilypond_svg"
              class="-ml-6 -mr-4 mb-3 lilypond-container"
            ></div>
            <span v-if="song_lyric.has_lyrics">
              <!-- <BasicButton
                class="mb-2 ml-1"
                text
                v-if="
                  chordSharedStore.nChordModes != 1 &&
                  chordSharedStore.chordMode == 0
                "
                @click="chordSharedStore.chordMode = 2"
                >Zobrazit akordy</BasicButton
              >
              <BasicButton
                class="mb-2 ml-1"
                text
                v-if="chordSharedStore.chordMode != 0"
                @click="chordSharedStore.chordMode = 0"
                >Skrýt akordy</BasicButton
              > -->
              <div
                v-if="
                  !$apollo.loading &&
                  song_lyric.capo > 0 &&
                  chordSharedStore.chordMode != 0
                "
                class="mb-2"
              >
                <i>capo: {{ song_lyric.capo }}</i>
              </div>
              <!-- here goes the song lyrics -->
              <song-lyric-parts
                :song-id="song_lyric.id"
                :font-size-percent="chordSharedStore.fontSizePercent"
                @loaded="isScrollable(true)"
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

      <BottomSheets v-model="showTools" title="Nástroje">
        <div
          v-if="chordSharedStore.nChordModes != 1"
          :class="{
            'opacity-40 pointer-events-none': chordSharedStore.chordMode == 0,
          }"
        >
          <transposition
            v-model="chordSharedStore.transposition"
          ></transposition>
        </div>

        <div
          v-if="chordSharedStore.nChordModes != 1"
          :class="{
            'opacity-40 pointer-events-none': chordSharedStore.chordMode == 0,
          }"
        >
          <chord-sharp-flat
            v-model="chordSharedStore.useFlatScale"
          ></chord-sharp-flat>
        </div>

        <div v-if="chordSharedStore.nChordModes != 1">
          <chord-mode v-model="chordSharedStore.chordMode"></chord-mode>
        </div>

        <div>
          <font-sizer v-model="chordSharedStore.fontSizePercent"></font-sizer>
        </div>

        <no-sleep />
      </BottomSheets>

      <BottomSheets v-model="showMedia" title="Nahrávky">
        <div class="row ml-0 pt-2" v-if="hasExternals && !$apollo.loading">
          <div
            class="col-md-6"
            v-for="(external, index) in recordings"
            :key="index"
          >
            <external
              :line="false"
              :index="index"
              :external="external"
              :song-name="song_lyric.name"
            ></external>
          </div>
        </div>
      </BottomSheets>
      <!-- control buttons -->
      <!-- <div>
          <div
            class="d-inline-block btn-group m-0 float-right"
            role="group"
            :class="{ chosen: autoscroll }"
            v-if="scrollable"
          >
            <a class="btn btn-secondary" @click="autoscroll = !autoscroll">
              <i
                class="fas"
                :class="[
                  autoscroll ? 'pr-0 fa-stop-circle' : 'fa-arrow-circle-down',
                ]"
              ></i>
              <span class="d-none d-sm-inline" v-if="!autoscroll"
                >Rolovat</span
              > </a
            ><a
              class="btn btn-secondary"
              v-if="autoscroll"
              @click="autoscrollNum--"
              :class="{ disabled: autoscrollNum == 1 }"
              >&minus;</a
            ><a
              class="btn btn-secondary"
              v-if="autoscroll"
              @click="autoscrollNum++"
              :class="{ disabled: autoscrollNum == 20 }"
              >&plus;</a
            >
          </div>
        </div> -->
    </div>
  </div>
  <!-- <div class="p-1 mb-3 mt-n2">
    <div class="px-3 py-2 d-inline-block">
      Zpěvník ProScholy.cz
      <img src="/img/logo.svg" width="20px" />
      {{ new Date().getFullYear() }}
    </div>
    <div class="float-right">
      <a
        class="btn btn-secondary"
        :href="
          'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
          encodeURIComponent($config.public.baseUrl + $route.fullPath)
        "
        >Nahlásit</a
      >
      <a
        class="btn btn-secondary"
        v-if="song_lyric"
        :href="$config.public.adminUrl + '/song/' + song_lyric.id + '/edit'"
        >Upravit</a
      >
    </div>
  </div> -->
</template>

<script>
import { store } from '../../store.js';
import lodash from 'lodash';
const { throttle } = lodash;

import FontSizer from './FontSizer';
import ChordMode from './ChordMode';
import ChordSharpFlat from './ChordSharpFlat';
import Transposition from './Transposition';
import Translations from './Translations';
import TopBox from './TopBox';
import BottomBar from './BottomBar';
import NoSleep from './NoSleep';
import SongLyricParts from '../Renderer/SongLyricParts';
import { getFullName } from '~/components/SongName';
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
      // bottomMode: 0,
      showTools: false,
      showMedia: false,
      topMode: 0,
      autoscroll: false, // todo: autoscroll
      autoscrollNum: 10,
      scrolldelay: null,
      fullscreen: false,
      selectedScoreIndex: 0,
      scrollable: true,
      chordSharedStore: store,
    };
  },

  watch: {
    autoscroll: function () {
      this.setScroll(this.autoscrollNum, this.autoscroll);
    },
    autoscrollNum: function () {
      this.setScroll(this.autoscrollNum, this.autoscroll);
    },
  },

  destroyed() {
    this.setScroll(this.autoscrollNum, false);
  },

  computed: {
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
    setScroll: function (num, condition) {
      clearInterval(this.scrolldelay);
      if (process.client && num > 0 && num < 21 && condition) {
        this.scrolldelay = setInterval(
          function () {
            window.scrollBy(0, 1);
            if (
              window.innerHeight + window.scrollY >=
              document.body.scrollHeight
            ) {
              // we're at the bottom of the page
              this.autoscroll = false;
            }
          }.bind(this),
          (21 - num) * 10
        );
      }
    },

    isScrollable: throttle(function isScrollableTh(initial) {
      if (
        process.client &&
        document.body.scrollHeight == document.body.clientHeight
      ) {
        // the page isn't scrollable
        this.scrollable = false;

        if (initial === true) {
          // this.bottomMode = 1;
        }
      } else {
        this.scrollable = true;
      }
    }, 100),

    keyUp: function (e) {
      if (e.key == '+') {
        if (this.autoscroll && this.autoscrollNum < 20) {
          this.autoscrollNum++;
        }
        this.autoscroll = true;
      } else if (e.key == 'Escape') {
        this.autoscroll = false;
      } else if (e.key == '-' && this.autoscrollNum > 1) {
        this.autoscrollNum--;
      }
    },

    getFullName: getFullName,
  },

  mounted() {
    if (!this.song_lyric.has_lyrics) {
      if (this.recordings.length) {
        // this.bottomMode = 2;
      }

      if (this.scores.length) {
        this.topMode = 1;
      } else if (this.renderTranslations) {
        this.topMode = 2;
      }

      this.scrollable = false;
    } else {
      window.addEventListener('resize', this.isScrollable);
      this.isScrollable(true);
      window.addEventListener('keyup', this.keyUp);
    }

    this.chordSharedStore.transposition = 0;
  },
};
</script>

<style lang="postcss">
.lilypond-container svg {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>

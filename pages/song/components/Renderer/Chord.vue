<template>
  <span class="chord">
    <!-- the if condition syntax is weird but necessary here -->
    <span class="chord-sign" v-if="displayChordSign">
      <span v-if="baseNote.length > 0">&#8203;</span>
      <span v-if="isOptional">(</span>
      <span class="chord-base">{{ baseNote }}</span>
      <span class="chord-variant">{{ variant }}</span>
      <span class="chord-extension">{{ extension }}</span>
      <span class="chord-bass" v-if="bass.length !== 0">/{{ bassNote }}</span>
      <span class="chord-right-bracket" v-if="isOptional">)</span>
      <span v-if="baseNote.length > 0">&#8202;</span>
    </span>
    <span :class="['chord-text', !isDivided ? 'chord-text-spaced' : '']"
      ><slot></slot
    ></span>
    <span class="chord-line" v-if="isDivided && displayChordSign"></span>
  </span>
</template>

<script>
import { mapStores } from 'pinia';
import useChordStore from '~/stores/chord.js';

export default {
  props: [
    'base',
    'variant',
    'extension',
    'bass',
    'isDivided',
    'isSubstitute',
    'isOptional',
    'hasNextSibling',
  ],

  created() {
    // After being decided between #/b, do not use later chords
    // (there can be some transposition later in the song)
    if (this.chordSharedStore.useFlatScale_notified) {
      return;
    }

    const isFlatNote = (note) => note.length > 1 && note[1] === 'b';

    // I'm a B-flat chord -> set flats as default
    if (this.base === 'B' || isFlatNote(this.base) || isFlatNote(this.bass)) {
      this.chordSharedStore.useFlatScale = true;
      this.chordSharedStore.useFlatScale_notified = true;
    }
  },

  computed: {
    ...mapStores(useChordStore),

    baseNote() {
      if (this.base == '') {
        return '';
      }

      return this.transposeChordBy(
        this.base,
        this.chordSharedStore.transposition,
        this.chordSharedStore.useFlatScale
      );
    },

    bassNote() {
      if (this.bass == '') {
        return '';
      }

      return this.transposeChordBy(
        this.bass,
        this.chordSharedStore.transposition,
        this.chordSharedStore.useFlatScale
      );
    },

    displayChordSign() {
      if (!this.chordSharedStore.showChords) return false;
      if (this.chordSharedStore.simpleView) return !this.isSubstitute;
      return true;
    },
  },

  methods: {
    transposeChordBy(chord, semitones, useFlatScale) {
      const BASIC_SCALE = [
        'C',
        '-',
        'D',
        '-',
        'E',
        'F',
        '-',
        'G',
        '-',
        'A',
        '-',
        'H',
      ];

      // Chromatic scale starting from C using flats only.
      const FLAT_SCALE = [
        'C',
        'Db',
        'D',
        'Eb',
        'Fb',
        'F',
        'Gb',
        'G',
        'Ab',
        'A',
        'B',
        'Cb',
      ];

      // Chromatic scale starting from C using sharps only.
      const SHARP_SCALE = [
        'H#',
        'C#',
        'D',
        'D#',
        'E',
        'E#',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'H',
      ];

      let scale = useFlatScale ? FLAT_SCALE : SHARP_SCALE;
      let chord_i = FLAT_SCALE.indexOf(chord);
      if (chord_i === -1) {
        chord_i = SHARP_SCALE.indexOf(chord);
      }

      let new_i = (chord_i + semitones + 12) % 12;

      return BASIC_SCALE[new_i] == '-' ? scale[new_i] : BASIC_SCALE[new_i];
    },
  },
};
</script>

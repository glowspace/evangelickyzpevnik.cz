<template>
  <div>
    <div
      class="tag-group"
      v-if="song.tags_liturgy_part.length || song.is_approved_for_liturgy"
    >
      <!-- <nuxt-link
        to="/napoveda#schvaleno-cbk"
        class="tag tag-blue"
        v-if="song.is_approved_for_liturgy"
      >
        schváleno ČBK pro liturgii <i class="fas fa-check"></i
      ></nuxt-link> -->
      <BasicChip
        v-for="tag in song.tags_liturgy_part"
        :key="tag.id"
        :to="'/?stitky=' + tag.id"
      >
        {{ tag.name }}
      </BasicChip>
    </div>

    <div
      class="tag-group"
      v-if="
        song.tags_liturgy_period
          .concat(song.tags_saints)
          .concat(song.tags_sacred_occasion)
          .concat(song.tags_generic).length
      "
    >
      <BasicChip
        v-for="tag in song.tags_liturgy_period"
        :key="tag.id"
        :to="'/?stitky=' + tag.id"
      >
        {{ tag.name }}
      </BasicChip>
      <BasicChip
        v-for="tag in song.tags_saints
          .concat(song.tags_sacred_occasion)
          .concat(song.tags_generic)"
        :key="tag.id"
        :to="'/?stitky=' + tag.id"
      >
        {{ tag.name }}
      </BasicChip>
    </div>

    <div class="tag-group" v-if="publicSongbookRecords.length">
      <BasicChip
        v-for="(sb, key) in publicSongbookRecords"
        :key="key"
         class="songbook-chip"
        :to="'/?zpevniky=' + sb.pivot.songbook.id + '&razeni=2'"
      >
        <span class="songbook-name">{{ sb.pivot.songbook.name }}</span
        ><span class="songbook-number">{{ sb.pivot.number }}</span>
      </BasicChip>
    </div>

    <div class="tag-group" v-if="bibleRefs">
      <BasicChip
        v-for="(reference, key) in bibleRefs"
        :key="'ref' + key"
        :href="`https://www.bibleserver.com/CEP/${reference}`"
        >{{ reference }}</BasicChip
      >
    </div>
  </div>
</template>

<script>
/**
 * Song tags component.
 *
 * It renders:
 * 1) related tags
 * 2) related songbooks
 * 3) liturgy approval
 * 4) bible reference
 */

// todo: fix bible-liturgy-utils/bible/cs_bcv_parser.js by adding `module.exports = this;` at the end of the file
// import bible from 'bible-liturgy-utils/bible/bible';

export default {
  name: 'Tags',

  props: ['song'],

  computed: {
    // todo: refactor to use server-side filtering of songbooks

    publicSongbookRecords() {
      return this.song.songbook_records.filter(
        (sb) => !sb.pivot.songbook.is_private
      );
    },

    bibleRefs() {
      // todo: fix bible refs (see the comment above)
      // if (this.song.bible_refs_src) {
      //   const lines = this.song.bible_refs_src.split('\n');
      //   const bib_refs = lines.map((l) => bible.parseEuropean(l));
      //   const lines_cz = bib_refs.flatMap((r) => r.toCzechStrings());

      //   return lines_cz;
      // }

      return false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag-group {
  @apply inline-flex flex-row flex-wrap items-start mr-4;
}

.songbook-chip {
  @apply !gap-0 p-0 overflow-hidden;
}

.songbook-name, .songbook-number {
  @apply py-1.5;
}

.songbook-name {
  @apply pl-3 pr-2.5;
}

.songbook-number {
  @apply pr-3 pl-2.5 bg-primary/10;
}
</style>

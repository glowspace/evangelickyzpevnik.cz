<template>
  <table class="table m-0 w-full">
    <tbody>
      <tr>
        <th colspan="2" class="text-left px-3 pb-2 pt-5 font-medium">
          {{ text }}
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in songs"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        :hideIcons="true"
      ></SLItem>
    </tbody>
  </table>
</template>

<script setup>
import SLItem from '~/pages/search/components/SLItem';
const props = defineProps(['text', 'songs']);
</script>

<!-- <template>
    <div class="card">
        <div class="card-header p-1"><div class="px-4 py-2 inline-block">{{ text }}</div></div>
        <div class="card-body p-0">
            <table class="table m-0">
                <tbody>
                    <tr v-for="(sl, key) in songs" :key="key">
                        <td class="p-1 align-middle">
                            <nuxt-link class="px-4 py-2 w-full inline-block" :to="sl.public_route"><song-name :song="sl"/></nuxt-link>
                        </td>
                        <td class="author-secondary-links px-1 py-2 align-middle">
                            <song-author-label :song="sl"></song-author-label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SongAuthorLabel from '../song/components/SongAuthorLabel';
import SongName from '~/components/SongName';

export default {
    name: 'AuthorSongsList',

    components: {
        SongAuthorLabel,
        SongName
    },

    props: ['text', 'songs']
};
</script> -->

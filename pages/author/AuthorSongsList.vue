<template>
  <table class="table m-0 w-full">
    <tbody>
      <tr>
        <th
          colspan="2"
          class="text-left px-3 pb-2 pt-5 font-custom-medium"
          :class="headingClass"
        >
          {{ headingText }}
        </th>
      </tr>
      <SLItem
        v-for="song_lyric in songs"
        :song_lyric="song_lyric"
        :key="song_lyric.id"
        hide-icons
      ></SLItem>
    </tbody>
  </table>
</template>

<script setup>
import SLItem, { SongListItemFragment } from '~/pages/search/components/SLItem';
const props = defineProps(['headingText', 'headingClass', 'songs']);
</script>

<script>
import gql from 'graphql-tag';
export const AuthorSongsListFields = gql`
  fragment AuthorSongsListFields on SongLyric {
    ...SongListItemFragment
    song {
      song_lyrics {
        type
        name
        public_route
        authors_pivot {
          pivot {
            author {
              name
              public_route
            }
            authorship_type
          }
        }
      }
    }
  }

  ${SongListItemFragment}
`;
</script>

<template>
  <table class="table m-0 w-full">
    <tbody>
      <tr>
        <th colspan="2" class="text-left px-3 pb-2 pt-5 font-custom-medium" :class="headingClass">
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
import SLItem from '~/pages/search/components/SLItem';
const props = defineProps(['headingText', 'headingClass', 'songs']);
</script>

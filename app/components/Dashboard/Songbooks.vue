<template>
  <div v-if="topSongbooks && topSongbooks.length">
    <DashboardCard title="Zpěvníky">
      <BasicClickable
        v-for="songbook in topSongbooks"
        :key="songbook.id"
        :to="'/zpevnik/' + songbook.id"
        class="list-item"
      >
        {{ songbook.name }}
      </BasicClickable>
    </DashboardCard>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const FETCH_SONGBOOKS = gql`
  query {
    songbooks(is_private: false) {
      id
      name
      songs_count
      color
    }
  }
`;

export default {
  apollo: {
    songbooks: {
      query: FETCH_SONGBOOKS,
    },
  },

  computed: {
    topSongbooks() {
      if (this.songbooks) {
        return this.songbooks.filter((s) => s.songs_count > 100).slice(0, 5);
      }
    },
  },
};
</script>

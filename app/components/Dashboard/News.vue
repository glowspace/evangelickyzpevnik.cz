<template>
  <div v-if="news_items && news_items.length">
    <DashboardCard title="Novinky">
      <UniversalLink
        v-for="item in news_items"
        :key="item.id"
        :type="item.link_type"
        :link="item.link"
        class="list-item"
      >
        <span class="list-icon" v-if="anyIcons">
          <BasicIcon :name="item.fa_icon" type="fa" />
        </span>
        <span>{{ item.text }}</span>
      </UniversalLink>
    </DashboardCard>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const FETCH_NEWS = gql`
  query {
    news_items(active: true) {
      id
      text
      fa_icon
      link
      link_type
    }
  }
`;

export default {
  apollo: {
    news_items: {
      query: FETCH_NEWS,
    },
  },

  computed: {
    anyIcons() {
      return this.news_items.some((item) => item.fa_icon);
    },
  },
};
</script>

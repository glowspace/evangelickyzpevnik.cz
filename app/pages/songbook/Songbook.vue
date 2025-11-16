<template>
  <PageTopBar :title="songbook?.name ?? 'načítám…'">
    <BasicButton
      icon-name="filter_alt"
      icon-only
      icon-fill
      :to="filterLink"
    />
    <Kebab
      v-if="songbook"
      :items="[
        {
          label: 'Nahlásit',
          icon: 'warning',
          href: getReportLink(),
        },
        {
          label: 'Upravit',
          icon: 'edit',
          href: $config.public.adminUrl + '/songbook/' + songbook.id + '/edit',
        },
      ]"
    />
  </PageTopBar>
  <div class="custom-container">
    <div class="m-5">
      <template v-if="pending">
        <LoaderSkeleton type="heading" class="mt-6" />
        <LoaderSkeleton type="paragraph" class="mt-6" />
      </template>
      <template v-else-if="!songbook">
        <!-- displayed only after client-side navigation (SSR throws) -->
        <p>Zpěvník nebyl nalezen.</p>
      </template>
      <template v-else>
        <SongList :filters="filters" :sort="sort" :seed="0"></SongList>
      </template>
    </div>
  </div>
</template>

<script setup>
import { toGETParameters } from '~/components/Search/HistoryManager.vue';
import gql from 'graphql-tag';

const FETCH_SONGBOOK = gql`
  query ($id: ID!) {
    songbook(id: $id) {
      id
      name
      is_private
    }
  }
`;

// load data
const route = useRoute();
const id = route.params.id;
const { data, pending } = await useLazyAsyncQuery(FETCH_SONGBOOK, { id });
const songbook = computed(() => (data.value?.songbook?.is_private ? null : data.value?.songbook));

if (import.meta.server) {
  checkNotFound(songbook.value);
}

// head content
const { variation, titleSeparator } = useRuntimeConfig()?.public;
const title = computed(
  () => (songbook.value?.name ?? 'Zpěvník') + titleSeparator + variation.title
);
useHead(generateHead(title, 'I tento zpěvník u nás najdete.'));

// other
const filters = computed(() => {
  var f = { tags: {}, songbooks: {}, languages: {} };
  f.songbooks[id] = true;
  return f;
});
const sort = { by: 2, desc: false };

const filterLink = computed(() => {
  return {
    path: '/',
    query: toGETParameters({
      searchString: '',
      filters: filters.value,
      showAuthors: false,
      seed: null,
      sort: sort,
    }),
  };
});
</script>

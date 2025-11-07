<template>
  <!-- todo: refactor so that it does not need client-only wrapper -->
  <!-- <client-only> -->
  <div class="mb-4">
    <LoaderLinear
      :class="[{ 'opacity-0': results_loaded }, 'transition-opacity']"
    />
    <table class="w-full">
      <tbody>
        <tr v-if="!results_loaded && !(authors && authors.length)">
          <td class="pl-8 pr-3 w-5">
            <LoaderCircular size="5" />
          </td>
          <td>Načítám…</td>
          <td class="p-2 text-right pr-7">
            <BasicButton
              :href="
                'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
                encodeURIComponent($config.public.siteUrl + $route.fullPath)
              "
              type="outlined"
            >
              Nahlásit
            </BasicButton>
          </td>
        </tr>
        <template v-else-if="authors && authors.length">
          <tr v-for="author in authors" :key="author.id">
            <td>
              <BasicClickable class="px-5 py-3 lg:pl-12 block" :to="author.public_route">
                {{ author.name }}
              </BasicClickable>
            </td>
            <td>
              <BasicClickable
                class="pr-6 lg:pr-12 py-3 block text-right text-gray"
                :to="author.public_route"
                tabindex="-1"
              >
                {{ author.type_string }}
              </BasicClickable>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="px-8 py-4" colspan="2">
            <span v-if="searchString"
              >Žádný autor odpovídající zadaným kritériím nebyl nalezen.</span
            >
            <span v-else
              >Začněte psát do vyhledávacího pole nahoře a&nbsp;seznam autorů se
              zobrazí…</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- </client-only> -->
</template>

<script>
import gql from 'graphql-tag';

// Query
const fetch_items = gql`
  query ($search_string: String) {
    authors(search_string: $search_string, order_abc: true) {
      id
      name
      public_route
      type_string
    }
  }
`;

export default {
  props: ['search-string'],

  data() {
    return {
      results_loaded: false,
    };
  },

  // GraphQL client
  apollo: {
    authors: {
      query: fetch_items,
      variables() {
        return {
          search_string: this.searchString,
        };
      },
      debounce: 1,
      result(result) {
        this.$emit('query-loaded', null);
        this.results_loaded = true;
      },
    },
  },

  watch: {
    searchString(val) {
      this.results_loaded = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
tr:hover,
tr:focus-within {
  @apply bg-surface-50;
}

tr:active {
  @apply bg-surface-200;
}
</style>

<template>
  <div class="container">
    <div class="error">
      <h1>Error {{ error.statusCode }}</h1>
      <p v-if="error.statusCode === 404">
        Stránka nebyla nalezena. <br />Zkuste použít vyhledávání.
      </p>
      <p v-else>
        Ajajaj, někde se stala chyba.<br />
        Zkuste použít vyhledávání.
      </p>
      <div class="text-center text-white">
        <nuxt-link
          to="/"
          class="btn btn-outline-light display-all-songs font-weight-bold"
        >
          <i class="fas fa-search pr-1"></i> VYHLEDÁVÁNÍ
        </nuxt-link>
      </div>
      <div class="text-center text-white mt-3 mb-5">
        <a
          :href="
            'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
            encodeURIComponent($config.public.siteUrl + $route.fullPath) +
            '&summary=Chyba%20webu%20(' +
            error.statusCode +
            ')'
          "
          class="btn btn-outline-light display-all-songs font-weight-bold"
        >
          <i class="fas fa-exclamation-triangle pr-1"></i> NAHLÁSIT
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
    getTitle() {
      return (
        'Error ' +
        this.error.statusCode +
        this.$config.public.titleSeparator +
        this.$config.public.siteName
      );
    },

    getDescription() {
      return '';
    },
  },
};
</script>

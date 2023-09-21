<template>
  <NuxtLayout>
    <ErrorTitle :error="error" />
    <TopBar
      @back="previous ? $router.back() : navigateTo('/')"
      :title="'Chyba ' + error.statusCode"
      is-h1
    />
    <div class="custom-container">
      <div class="shadow bg-surface-100 mx-4 my-12 px-6 py-4 inline-block">
        <p class="mb-3">
          <span v-if="error.statusCode === 404">
            Stránka nebyla nalezena. <br />Zkuste použít vyhledávání.
          </span>
          <span v-else>
            Ajajaj, někde se stala chyba.<br />
            Zkuste použít vyhledávání.
          </span>
        </p>
        <div class="-m-1">
          <BasicButton icon-name="search" type="primary" class="m-1" to="/"
            >Hledat</BasicButton
          >
          <BasicButton
            icon-name="warning"
            type="outlined"
            class="m-1"
            :href="
              'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
              encodeURIComponent($config.public.siteUrl + $route.fullPath) +
              '&summary=Chyba%20webu%20(' +
              error.statusCode +
              ')'
            "
            >Nahlásit</BasicButton
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps(['error']);
</script>

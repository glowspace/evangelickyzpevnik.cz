<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { siteUrl, variation } = useRuntimeConfig()?.public;
const route = useRoute();
useHead({
  title: variation.title,
  htmlAttrs: { lang: 'cs', dir: 'ltr' },
  meta: [
    { property: 'og:url', content: siteUrl + route.path },
    { property: 'og:type', content: 'website' },
    // { property: 'og:image', content: 'https://zpevnik.proscholy.cz/banner.png' },

    { name: 'apple-itunes-app', content: 'app-id=' + variation.itunesId },
  ],
  link: getLinks(),
  script: [{ src: '/dark.js' }],
});
</script>

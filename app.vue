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
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // todo: add other icon variants?
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amiri&display=swap', // this font is used by lilypond
    },
    {
      rel: 'stylesheet',
      // href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', // the font file would be too big
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@30,400,0..1,0',
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css',
      crossorigin: 'anonymous',
    },
  ],
  script: [{ src: '/dark.js' }],
});
</script>

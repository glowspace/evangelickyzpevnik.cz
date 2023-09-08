<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
const { siteName, siteUrl, itunesId } = useRuntimeConfig()?.public;
const route = useRoute();
useHead({
  title: siteName,
  htmlAttrs: { lang: 'cs', dir: 'ltr' },
  meta: [
    { name: 'msapplication-TileColor', content: '#da532c' },
    { name: 'theme-color', content: '#292929' },

    { property: 'og:url', content: siteUrl + route.path },
    { property: 'twitter:url', content: siteUrl + route.path },

    { property: 'og:type', content: 'website' },
    // { property: 'og:image', content: 'https://zpevnik.proscholy.cz/banner.png' },
    // { property: 'twitter:card', content: 'summary_large_image' },
    // { property: 'twitter:image', content: 'https://zpevnik.proscholy.cz/banner.png' }

    { name: 'apple-itunes-app', content: 'app-id=' + itunesId },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // {
    //   rel: 'apple-touch-icon',
    //   sizes: '180x180',
    //   href: '/favicon/apple-touch-icon.png',
    // },
    // {
    //   rel: 'icon',
    //   type: 'image/png',
    //   sizes: '32x32',
    //   href: '/favicon/favicon-32x32.png',
    // },
    // {
    //   rel: 'icon',
    //   type: 'image/png',
    //   sizes: '16x16',
    //   href: '/favicon/favicon-16x16.png',
    // },
    // { rel: 'manifest', href: '/favicon/site.webmanifest' },
    // {
    //   rel: 'mask-icon',
    //   href: '/favicon/safari-pinned-tab.svg',
    //   color: '#5bbad5',
    // },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amiri&display=swap',
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

// import Navbar from '~/components/Navbar';

onMounted(() => {
  // 1.4.2021
  if (
    new Date().getDate() == 1 &&
    new Date().getMonth() == 3 &&
    new Date().getFullYear() == 2021
  ) {
    document.body.style =
      'background-blend-mode: luminosity; background-color: #0fbe34;';
  }

  // http://patorjk.com/software/taag/#p=display&f=Ivrit&t=ProScholy.cz
  // console.log(
  //   "%c  ____           ____       _           _                 \n |  _ \\ _ __ ___/ ___|  ___| |__   ___ | |_   _   ___ ____\n | |_) | '__/ _ \\___ \\ / __| '_ \\ / _ \\| | | | | / __|_  /\n |  __/| | | (_) |__) | (__| | | | (_) | | |_| || (__ / / \n |_|   |_|  \\___/____/ \\___|_| |_|\\___/|_|\\__, (_)___/___|\n                                          |___/           ",
  //   'font-family: monospace; font-weight: bold;'
  // );
  // console.log(
  //   'Hmm, asi se tady vyznáš… Stále hledáme posily do našeho týmu vývojářů, takže jestli se k nám chceš přidat, neváhej nás kontaktovat na redakce@proscholy.cz.'
  // );
});
</script>

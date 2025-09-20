import graphql from '@rollup/plugin-graphql';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // debug: true,
  compatibilityDate: '2025-09-20',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      siteName: 'Evangelický zpěvník',
      itunesId: '1475375453',
      siteUrl:
        process.env.APP_URL ||
        (process.env.VERCEL_URL
          ? 'https://' + process.env.VERCEL_URL
          : false) ||
        'http://localhost:3000',
      titleSeparator: ' – ',
      apiPath: process.env.API_PATH || '/api',
      adminUrl: process.env.ADMIN_URL || '',
      regenschoriUrl:
        process.env.REGENSCHORI_URL || 'https://www.regenschori.cz',
      proscholyUrl: process.env.PROSCHOLY_URL || 'https://zpevnik.proscholy.cz',
      isEvangelicalSongbook: true,
    },
  },
  vite: {
    plugins: [graphql()], // Allow usage of .gql/.graphql files
  },
  nitro: {
    routeRules: {
      '/api': { proxy: process.env.REMOTE_API },
    },
  },
  tailwindcss: {
    configPath: '~/assets/tailwind.config.js',
  },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => tag.startsWith('md-'),
  //   },
  // },
});

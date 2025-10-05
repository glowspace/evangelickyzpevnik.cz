import graphql from '@rollup/plugin-graphql';
import customPages from './config/pages';
import variations from './config/variations';

const variationKey = process.env.VARIATION || 'ez';
const variation =
  variations.find((v) => v.key == variationKey) || variations[0];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // debug: true,
  devtools: {
    enabled: false,
  },
  compatibilityDate: '2025-09-20',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
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
      variation: variation,
    },
  },
  vite: {
    plugins: [graphql()], // Allow usage of .gql/.graphql files
    define: {
      'globalThis.__DEV__': JSON.stringify(
        process.env.NODE_ENV === 'development'
      ), // Sets apollo in correct (development/production) mode
    },
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
  hooks: {
    'pages:extend'(pages) {
      // replace pages with customPages and variation.pages
      pages.splice(0, pages.length, ...customPages, ...(variation.pages || []));
    },
  },
  dir: {
    public: 'public/' + variationKey,
  },
});

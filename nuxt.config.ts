import variations from './variations/variations';

const variationKey = process.env.VARIATION || 'ez';
const variation = variations.find((v) => v.key == variationKey) || variations[0]!;

const siteUrl = process.env.APP_URL || `http://localhost:${process.env.DEV_PORT || 3000}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./variations/' + variationKey],
  // debug: true,
  devtools: {
    enabled: false,
  },
  compatibilityDate: '2025-09-20',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/apollo'],
  runtimeConfig: {
    public: {
      siteUrl,
      titleSeparator: ' – ',
      adminUrl: process.env.ADMIN_URL || '',
      regenschoriUrl: process.env.REGENSCHORI_URL || 'https://www.regenschori.cz',
      proscholyUrl: process.env.PROSCHOLY_URL || 'https://zpevnik.proscholy.cz',
      variation: variation,
    },
  },
  apollo: {
    // https://apollo.nuxtjs.org/getting-started/configuration
    clients: {
      default: {
        httpEndpoint: siteUrl + (process.env.API_PATH || '/api'),
        httpLinkOptions: {
          headers: variation.filter ? { 'Filter-Content': variation.filter } : {},
        },
      },
    },
  },
  routeRules: {
    '/api': { proxy: process.env.REMOTE_API },
  },
  tailwindcss: {
    configPath: '~/assets/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css',
  },
  devServer: {
    port: +(process.env.DEV_PORT || 3000),
  },
  dir: { pages: 'pages_' }, // to disable routes in ./pages
  components: ['~/pages', '~/components'], // to enable tailwind processing in ./pages
  hooks: {
    'pages:extend'(pages) {
      pages.push(
        ...[
          {
            name: 'index',
            path: '/',
            file: '~/pages/search/Search.vue',
          },
          {
            name: 'song',
            path: '/pisen/:id/:slug?',
            file: '~/pages/song/Song.vue',
          },
          {
            name: 'author',
            path: '/autor/:id',
            file: '~/pages/author/Author.vue',
          },
          {
            name: 'songbook',
            path: '/zpevnik/:id',
            file: '~/pages/songbook/Songbook.vue',
          },
        ]
      );
    },
  },
});

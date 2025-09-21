import graphql from '@rollup/plugin-graphql';

interface IVariation {
  key: string;
  filter?: string; // used as header and as songbook shorthand
  name: string;
  title: string;
  itunesId: string;
  songbook?: number;
  hideTags?: boolean;
  hideAuthorSearch?: boolean;
  showLiturgyApproval?: boolean;
}

const variations: IVariation[] = [
  {
    key: 'zps',
    name: 'Zpěvník pro scholy',
    title: 'ProScholy.cz',
    itunesId: '1475375453',
    showLiturgyApproval: true,
  },
  {
    key: 'ez',
    filter: 'ez',
    name: 'Evangelický zpěvník',
    title: 'Evangelický zpěvník',
    itunesId: '6502984934',
    songbook: 58,
    hideTags: true,
    hideAuthorSearch: true,
  },
];
const variationKey = process.env.VARIATION || 'ez';

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
      variation: variations.find((v) => v.key == variationKey) || variations[0],
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

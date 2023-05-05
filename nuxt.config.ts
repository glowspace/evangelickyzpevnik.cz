// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/api': { proxy: process.env.REMOTE_API },
    },
  },
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
    },
  },
});

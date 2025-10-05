export default defineNuxtConfig({
  hooks: {
    'pages:extend'(pages) {
      pages.push(
        ...[
          {
            path: '/materialy/mobilni-aplikace',
            redirect: '/',
          },
          {
            path: '/materialy/:page',
            redirect: '/materialy',
          },
          {
            path: '/zpevnik/:page?',
            redirect: '/o-zpevniku',
          },
        ]
      );
    },
  },
});

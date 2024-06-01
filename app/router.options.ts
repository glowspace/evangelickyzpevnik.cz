import type { RouterOptions } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => [
    {
      name: 'index',
      path: '/',
      component: () => import('~/pages/search/Search.vue'),
    },
    {
      name: 'song',
      path: '/pisen/:id/:slug?',
      component: () => import('~/pages/song/Song.vue'),
    },
    {
      name: 'author',
      path: '/autor/:id',
      component: () => import('~/pages/author/Author.vue'),
    },
    {
      name: 'about',
      path: '/o-zpevniku',
      component: () => import('~/pages/about/About.vue'),
    },
    {
      path: '/zpevnik/:page?',
      redirect: '/o-zpevniku',
    },
    {
      name: 'downloads',
      path: '/materialy',
      component: () => import('~/pages/about/Downloads.vue'),
    },
    {
      path: '/materialy/:page',
      redirect: '/materialy',
    },
  ],
};

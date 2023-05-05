import type { RouterOptions } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => [
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
      name: 'song',
      path: '/pisen/:id/:slug?',
      component: () => import('~/pages/song/Song.vue'),
    },
  ],
};

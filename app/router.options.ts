import type { RouterOptions } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => [
    {
      name: 'song',
      path: '/autor/:id',
      component: () => import('~/pages/author/Author.vue'),
    },
  ],
};

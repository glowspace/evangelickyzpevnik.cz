import type { NuxtPage } from 'nuxt/schema';

const pages: NuxtPage[] = [
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
    name: 'about',
    path: '/o-zpevniku',
    file: '~/pages/about/About.vue',
  },
];

export default pages;

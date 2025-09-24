import { defineStore } from 'pinia'

export default defineStore('list', {
  state: () => ({
    active: false,
    searchString: '',
    filters: {
      tags: {},
      songbooks: {},
      languages: {},
    },
    sort: { by: 0, desc: false },
    seed: null,
  }),
})

import { defineStore } from 'pinia'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default defineStore('list', {
  state: () => ({
    active: null,
    searchString: '',
    filters: {
      tags: {},
      songbooks: {},
      languages: {},
    },
    sort: { by: 0, desc: false },
    seed: randomInt(1, 100000),
  }),

  actions: {
    randomizeSeed() {
      this.seed = randomInt(1, 100000);
    },

    resetBasicSearch() {
      this.searchString = '';
      this.filters = {
        tags: {},
        languages: {},
        songbooks: {},
      };
      this.sort = {
        by: 0,
        desc: false,
      };
    },

    setActiveList(list = null) {
      this.active = list;
    },
  }
})

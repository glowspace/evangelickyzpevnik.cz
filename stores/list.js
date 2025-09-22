import { defineStore } from 'pinia'

export default defineStore('list', {
  state: () => ({
    active: false,
    searchString: '',
    selectedTags: {},
    selectedSongbooks: {},
    selectedLanguages: {},
    sort: 0,
    descending: false,
    seed: 0,
  }),
})

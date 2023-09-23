import { defineStore } from 'pinia'

export default defineStore('chordShared', {
  state: () => ({
    transposition: 0,
    showChords: true,
    simpleView: false,
    useFlatScale: false,
    useFlatScale_notified: false,
    fontSizePercent: 100,
    noSleep: null
  }),
})

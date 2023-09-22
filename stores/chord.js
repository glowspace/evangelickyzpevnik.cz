import { defineStore } from 'pinia'

export default defineStore('chordShared', {
  state: () => ({
    transposition: 0,
    nChordModes: 1,
    chordMode: 0,
    useFlatScale: false,
    useFlatScale_notified: false,
    fontSizePercent: 100
  }),
})

import { VueHeadMixin } from "@unhead/vue"

// https://unhead.harlanzw.com/integrations/vue/options-api

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.mixin(VueHeadMixin)
})

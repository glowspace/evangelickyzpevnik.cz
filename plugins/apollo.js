import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import destr from 'destr'

// https://github.com/nuxt-modules/apollo/blob/v5/src/runtime/plugin.ts

export default defineNuxtPlugin(nuxtApp => {
  const cache = new InMemoryCache()
  const { siteUrl, apiPath } = useRuntimeConfig()?.public

  const apolloClient = new ApolloClient({
    cache,
    uri: siteUrl + apiPath,
    ...(process.server
      ? { ssrMode: true }
      : { ssrForceFetchDelay: 100 }),
  })

  // the original code expects multiple apollo clients
  // here, we have only one, so the key doesn't matter
  const key = 'api'
  const cacheKey = `_apollo:${key}`

  nuxtApp.hook('app:rendered', () => {
    nuxtApp.payload.data[cacheKey] = cache.extract()
  })

  if (process.client && nuxtApp.payload.data[cacheKey]) {
    cache.restore(destr(JSON.stringify(nuxtApp.payload.data[cacheKey])))
  }

  const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })

  nuxtApp.vueApp.use(apolloProvider)
})

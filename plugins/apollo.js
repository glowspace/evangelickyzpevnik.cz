import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { onError } from '@apollo/client/link/error'
import destr from 'destr'

// https://github.com/nuxt-modules/apollo/blob/v5/src/runtime/plugin.ts

export default defineNuxtPlugin(nuxtApp => {
  const cache = new InMemoryCache()
  const { siteUrl, apiPath, variation } = useRuntimeConfig()?.public
  const headers = {};

  if (variation.filter) {
    headers['Filter-Content'] = variation.filter;
  }

  const httpLink = createHttpLink({
    uri: siteUrl + apiPath,
    headers
  })

  const errorLink = onError((err) => {
    // nuxtApp.callHook('apollo:error', err)
    // https://www.npmjs.com/package/apollo-link-error
    if (err.response) {
      err.response.errors = undefined;
    }
    // todo: add some error logging (and something else?)
  })

  const link = ApolloLink.from([errorLink, httpLink])

  const apolloClient = new ApolloClient({
    cache,
    link,
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

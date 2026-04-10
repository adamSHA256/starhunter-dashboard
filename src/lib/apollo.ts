import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

/**
 * In production the app sits behind an nginx reverse-proxy that:
 *   1. forwards /api/graphql → Starhunter API (and injects the Bearer token)
 *   2. forwards /_uploads/   → Starhunter server (static assets, no auth)
 *
 * In development you can still hit the API directly by setting VITE_API_URL
 * and VITE_API_TOKEN in your .env file.
 */
const API_URL = import.meta.env.VITE_API_URL || '/api/graphql'
const token = import.meta.env.VITE_API_TOKEN

/** Base URL for resolving relative asset paths (avatars) returned by the API. */
export const ASSET_BASE_URL: string =
  import.meta.env.VITE_ASSET_BASE_URL || ''

const httpLink = createHttpLink({
  uri: API_URL,
  headers: {
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  },
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

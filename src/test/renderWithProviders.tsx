import { render, type RenderOptions } from '@testing-library/react'
import { ApolloClient, InMemoryCache, createHttpLink, type NormalizedCacheObject } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import type { ReactElement } from 'react'

export function createTestClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost/graphql' }),
    cache: new InMemoryCache(),
  })
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { client?: ApolloClient<NormalizedCacheObject> },
) {
  const client = options?.client ?? createTestClient()

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), client }
}

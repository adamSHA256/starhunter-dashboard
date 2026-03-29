import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const API_URL = 'https://release-current.starhunter.software/Api/graphql'
const token = import.meta.env.VITE_API_TOKEN

if (!token) {
  console.error(
    '[Apollo] VITE_API_TOKEN is not set. Create a .env file in the project root with:\n' +
    'VITE_API_TOKEN=your-token-here'
  )
}

const httpLink = createHttpLink({
  uri: API_URL,
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

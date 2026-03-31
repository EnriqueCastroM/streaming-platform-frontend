import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import userContainer from '../config/UserStore'

// ✅ Endpoint CORRECTO de GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:3000'
})

// ✅ Adjunta JWT automáticamente a cada request
const authLink = setContext((_, { headers }) => {
  const token = userContainer.getState().token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// ✅ Cliente final
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client

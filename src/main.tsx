import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
// APOLLO CLIENT
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// CONTEXT
import { UserContext } from './context/userContext'
// COMPONENTS
import App from './components/app/app'
// FUNCTIONS
import { getLoggedUser } from './functions/local-storage'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_URL
})

const authLink = setContext((_, { headers }) => {
  const loggedUser = getLoggedUser()
  const token = loggedUser?.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_URL,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
})

const AppWrapper = () => {
  const [userData, setUserData] = useState(getLoggedUser())

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </UserContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)

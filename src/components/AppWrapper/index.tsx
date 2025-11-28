// CORE
import { useState } from 'react'
// APOLLO CLIENT
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
// import { setContext } from '@apollo/client/link/context'
// CONTEXT
import { UserContext } from '../../context/userContext'
// COMPONENTS
import App from '../App'
// INTERFACES
import { LoggedUserData } from '@interfaces/context'
// FUNCTIONS
import { getLoggedUser } from '../../functions/local-storage'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APOLLO_URL
})

// const authLink = setContext((_, { headers }) => {
//   const loggedUser = getLoggedUser()
//   const token = loggedUser?.token ?? ''

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// })

const apolloClient = new ApolloClient({
  link: httpLink,
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const AppWrapper = () => {
  const [userData, setUserData] = useState<LoggedUserData | null>(getLoggedUser())

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </UserContext.Provider>
  )
}

export default AppWrapper

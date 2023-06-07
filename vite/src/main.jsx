import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// REDUCERS
import userReducer from './redux/reducers'
// APOLLO CLIENT
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// COMPONENTS
import App from  './components/app/app'
// FUNCTIONS
import { getLoggedUser } from './functions/local-storage'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_URL
})

const authLink = setContext((_, { headers }) => {
  const loggedUser = getLoggedUser()
  const token = loggedUser && loggedUser.token

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

const store = configureStore({
  reducer: {
    userReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)

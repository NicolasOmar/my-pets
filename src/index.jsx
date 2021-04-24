import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
// APOLLO CLIENT
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// COMPONENTS
import App from './components/core/app/app'
import { getLoggedUser } from './functions/local-storage'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_URL
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

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

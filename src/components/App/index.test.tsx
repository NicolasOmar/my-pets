import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import App from './index'

vi.mock('@context/userContext', () => ({
  UserContext: React.createContext({ userData: { name: 'Test User' } })
}))

const mockClient = new ApolloClient({
  link: ApolloLink.empty(),
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
})

describe('[App]', () => {
  test('renders without crashing', () => {
    render(
      <ApolloProvider client={mockClient}>
        <App />
      </ApolloProvider>
    )
    expect(true).toBe(true)
  })
})

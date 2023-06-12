import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// CONTEXT
import { UserContext } from '../../context'
// COMPONENTS
import App from './app'

describe('[App]', () => {
  const providerMock = { userData: null }

  describe('[HAPPY PATH]', () => {
    test('Renders without props', () => {
      render(
        <UserContext.Provider value={providerMock}>
          <MockedProvider mocks={[]} addTypefile={false}>
            <App />
          </MockedProvider>
        </UserContext.Provider>
      )
      const element = screen.getByText(/Welcome to My Pets/i)
      expect(element).toBeInTheDocument()
    })
  })
})

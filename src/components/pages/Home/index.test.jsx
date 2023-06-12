import React from 'react'
import { describe, test, expect } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
// APP_ROUTES
// GRAPHQL
// CONTEXT
// COMPONENTS
import Home from '.'
// FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'
// MOCKS
import { nameMock } from './index.mocks.json'

describe('[Home]', () => {
  beforeAll(() => {
    setLoggedUser({ name: nameMock })
  })

  test('Renders with a dummy logged User', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    )
    expect(screen.getByText(`HELLO ${nameMock.toUpperCase()}`)).toBeInTheDocument()
  })
})

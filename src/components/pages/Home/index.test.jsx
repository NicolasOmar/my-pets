import { describe, test, expect } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { GET_MY_PETS_POPULATION_QUERY } from '../../../graphql/queries'
// CONTEXT
// COMPONENTS
import Home from '.'
// FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'
// MOCKS
import { testing } from './index.mocks.json'

const baseRequest = {
  query: GET_MY_PETS_POPULATION_QUERY
}

describe('[Home]', () => {
  const { nameMock, positiveResponse } = testing

  beforeAll(() => {
    setLoggedUser({ name: nameMock })
  })

  test('Renders with a dummy logged User', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(`HELLO ${nameMock.toUpperCase()}`)).toBeInTheDocument()
    })
  })

  test('Renders with populated data', async () => {
    const mockedPetsInfo = positiveResponse.data.getMyPetsPopulation[1]
    const mockedQuantity = `${mockedPetsInfo.name}s: ${mockedPetsInfo.quantity}`
    const positiveMock = [
      {
        request: baseRequest,
        result: positiveResponse
      }
    ]
    render(
      <MockedProvider mocks={positiveMock} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(`You have ${mockedPetsInfo.quantity} pet`)).toBeInTheDocument()
      expect(screen.getByText(mockedQuantity)).toBeInTheDocument()
    })
  })
})

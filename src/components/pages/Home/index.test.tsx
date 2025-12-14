import React from 'react'
import { describe, test, expect, beforeAll, vi } from 'vitest'
import { MockedProvider } from '@apollo/client/testing/react'
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
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[Home]', () => {
  const { nameMock, positiveResponse } = testing

  beforeAll(() => {
    setLoggedUser({ name: nameMock })
  })

  test('Renders with a dummy logged User', async () => {
    render(
      <MockedProvider mocks={[]}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(`Hey, ${nameMock}. Nice to see you here!`)).toBeInTheDocument()
    })
  })

  test('Renders with populated data', async () => {
    const mockedPetsInfo = positiveResponse.data.getMyPetsPopulation[1]
    const mockedQuantity = `${mockedPetsInfo.quantity} pet registered`
    const positiveMock = [
      {
        request: baseRequest,
        result: positiveResponse
      }
    ]
    render(
      <MockedProvider mocks={positiveMock}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(mockedQuantity)).toBeInTheDocument()
    })
  })
})

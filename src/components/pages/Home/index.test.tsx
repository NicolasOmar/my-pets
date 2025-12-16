import React from 'react'
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest'
import { MockedProvider } from '@apollo/client/testing/react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { GET_MY_PETS_POPULATION_QUERY } from '../../../graphql/queries'
// CONTEXT
// COMPONENTS
import Home from '.'
// CONSTANTS
import { HOME_PAGE_LABELS } from '../../../constants/forms'
// FUNCTIONS
import { clearAllStorage, setLoggedUser } from '../../../functions/local-storage'
// MOCKS
import { testing } from './index.mocks.json'
import { APP_ROUTES } from '../../../constants/routes'

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
  const baseMock = [
    {
      request: baseRequest,
      result: positiveResponse
    }
  ]

  beforeEach(() => {
    setLoggedUser({ name: nameMock })
    cleanup()
  })

  afterEach(() => {
    clearAllStorage()
  })

  test('Renders with a dummy logged User', async () => {
    const userGreeting = `${HOME_PAGE_LABELS.USER_GREETING_START}${nameMock}${HOME_PAGE_LABELS.USER_GREETING_END}`

    render(
      <MockedProvider mocks={baseMock}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(userGreeting)).toBeInTheDocument()
    })
  })

  test('Renders with no logged User', async () => {
    clearAllStorage()

    render(
      <MockedProvider mocks={baseMock}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(HOME_PAGE_LABELS.NO_USER_GREETINGS)).toBeInTheDocument()
    })
  })

  test('Renders with populated data and navigates on pet link click', async () => {
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

    const petLink = screen.getByText(mockedQuantity)
    petLink.click()

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
    })
  })
})

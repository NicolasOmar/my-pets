import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing/react'
import { GET_MY_PETS_QUERY } from '../../../graphql/queries'
// COMPONENTS
import PetList from '.'
// CONSTANTS
import { PET_LIST_TEST_IDS } from '../../../constants/lists'
// MOCKS
import { getMyPetsResponseMock, petCardMock } from './mocks.json'

const baseRequest = {
  query: GET_MY_PETS_QUERY
}
const loadingMock = [
  {
    request: {
      ...baseRequest,
      variables: {}
    },
    result: { data: { getMyPets: [] } }
  }
]
const positiveMock = [
  {
    request: baseRequest,
    result: getMyPetsResponseMock
  }
]
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[PetList]', () => {
  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={loadingMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(PET_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })

  test('Should render the page with the loaded pet card', async () => {
    render(
      <MockedProvider mocks={positiveMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      petCardMock.forEach(mockValue => expect(screen.getByText(mockValue)).toBeInTheDocument())
    })
  })
})

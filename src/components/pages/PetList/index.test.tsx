import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing/react'
import { GET_MY_PETS_QUERY } from '../../../graphql/queries'
// COMPONENTS
import PetList from '.'
// MOCKS
import { testing } from './index.mocks.json'
import { PET_LIST_TEST_IDS } from '../../../constants/lists'

const baseRequest = {
  query: GET_MY_PETS_QUERY
}
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[PetList]', () => {
  const { positiveResponse, valuesToAppear } = testing

  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={[]}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(PET_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })

  test('Should render the page with the loaded pet', async () => {
    const positiveMock = [
      {
        request: baseRequest,
        result: positiveResponse
      }
    ]

    render(
      <MockedProvider mocks={positiveMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      valuesToAppear.forEach(mockValue => expect(screen.getByText(mockValue)).toBeInTheDocument())
    })
  })
})

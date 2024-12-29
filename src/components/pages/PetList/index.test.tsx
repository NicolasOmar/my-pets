import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing'
import { GET_MY_PETS_QUERY } from '@graphql/queries'
// COMPONENTS
import PetList from '.'
// MOCKS
import { testing } from './index.mocks.json'

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
  const { pageTitle, loadingBarTestId, positiveResponse, valuesToAppear } = testing

  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(pageTitle)).toBeInTheDocument()
      expect(screen.getByTestId(loadingBarTestId)).toBeInTheDocument()
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
      <MockedProvider mocks={positiveMock} addTypename={false}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      valuesToAppear.forEach(mockValue => expect(screen.getByText(mockValue)).toBeInTheDocument())
    })
  })
})

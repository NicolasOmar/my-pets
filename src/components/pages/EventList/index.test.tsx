import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing'
import { GET_MY_PET_EVENTS } from '../../../graphql/queries'
// COMPONENTS
import EventList from '.'
// MOCKS
import { testing } from './mocks.json'
import { EVENT_LIST_TEST_IDS } from '../../../constants/lists'

const baseRequest = {
  query: GET_MY_PET_EVENTS,
  variables: {
    petId: testing.petId.toString()
  }
}
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useParams: () => mockUseNavigate,
    useNavigate: () => ({ petId: '676f72bb01701ca0bf911446' })
  }
})

describe.skip('[EventList]', () => {
  const { positiveResponse } = testing

  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(EVENT_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })

  test('Should render the page with loaded events', async () => {
    const positiveMock = [
      {
        request: baseRequest,
        result: positiveResponse
      }
    ]

    render(
      <MockedProvider mocks={positiveMock} addTypename={false}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => {
      positiveResponse.data.getMyPetEvents.forEach(({ description, date }) => {
        expect(screen.getByText(description)).toBeInTheDocument()
        expect(screen.getByText(date)).toBeInTheDocument()
      })
    })
  })
})

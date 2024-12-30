import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
// COMPONENTS
import EventList from '.'
// MOCKS
import { testing } from './mocks.json'
import { title, noDataTitle } from './config.json'

const baseRequest = {
  query: GET_MY_PET_EVENTS
}
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useParams: () => mockUseNavigate,
    useNavigate: () => mockUseNavigate
  }
})

describe('[EventList]', () => {
  const { positiveResponse } = testing

  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(noDataTitle)).toBeInTheDocument()
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

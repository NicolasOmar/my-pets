import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing/react'
import { GET_MY_PET_EVENTS } from '../../../graphql/queries'
import { DELETE_EVENT } from '../../../graphql/mutations'
// COMPONENTS
import EventList from '.'
// CONSTANTS
import { EVENT_LIST_TEST_IDS } from '../../../constants/lists'
import { COMMON_LABELS } from '../../../constants/common'
import { APP_ROUTES } from '../../../constants/routes'
// MOCKS
import {
  getPetResponseMock,
  datesToDisplay,
  deleteEventPayloadMock,
  deleteEventResponseMock
} from './mocks.json'

const baseRequest = {
  query: GET_MY_PET_EVENTS,
  variables: { petId: '' }
}
const loadingNoEventsMock = [
  {
    request: baseRequest,
    result: { data: { getMyPetEvents: [] } }
  }
]
const loadingTwoEventsMock = [
  {
    request: baseRequest,
    result: getPetResponseMock
  }
]
const deleteEventMock = [
  {
    request: {
      query: DELETE_EVENT,
      variables: deleteEventPayloadMock
    },
    result: deleteEventResponseMock
  },
  {
    request: baseRequest,
    result: getPetResponseMock
  }
]
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate,
    useParams: () => ({ petId: '' })
  }
})

describe('[EventList]', () => {
  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={loadingNoEventsMock}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(EVENT_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })

  test('Should render the page with loaded events and go back to event list once the go back button is clicked', async () => {
    render(
      <MockedProvider mocks={loadingTwoEventsMock}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => {
      getPetResponseMock.data.getMyPetEvents.forEach(({ description }, mockIndex) => {
        expect(screen.getByText(`Date: ${datesToDisplay[mockIndex]}`)).toBeInTheDocument()
        expect(screen.getByText(`Description: ${description}`)).toBeInTheDocument()
      })
    })

    const goBackButton = screen.getByTestId(EVENT_LIST_TEST_IDS.GO_BACK_BTN)
    expect(goBackButton).toBeInTheDocument()

    fireEvent.click(goBackButton)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
    })
  })

  test('Should render the page with loaded events and go event edition once the edit button is clicked', async () => {
    let editButton: HTMLElement
    render(
      <MockedProvider mocks={loadingTwoEventsMock}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => (editButton = screen.getAllByText(COMMON_LABELS.UPDATE)[0]))

    fireEvent.click(editButton!)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith(
        `${APP_ROUTES.EVENT_FORM}//${getPetResponseMock.data.getMyPetEvents[0].id}`
      )
    })
  })
  test('Should render the page with loaded events and delete one once the delete button is clicked', async () => {
    let deleteButton: HTMLElement
    render(
      <MockedProvider mocks={[...loadingTwoEventsMock, ...deleteEventMock]}>
        <EventList />
      </MockedProvider>
    )

    await waitFor(() => (deleteButton = screen.getAllByText(COMMON_LABELS.DELETE)[0]))

    fireEvent.click(deleteButton!)

    await waitFor(() => {
      expect(screen.getByTestId(EVENT_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })
})

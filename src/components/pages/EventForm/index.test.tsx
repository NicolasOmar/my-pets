import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { CREATE_EVENT } from '../../../graphql/mutations'
import { GET_MY_PETS_NAMES_QUERY } from '../../../graphql/queries'
// CONTEXT
// COMPONENTS
import EventForm from '.'
// CONSTANTS
import { EVENT_FORM_TEST_IDS } from '../../../constants/forms'
import { APP_ROUTES } from '../../../constants/routes'
// MOCKS
import {
  createEventPayloadMock,
  createEventResponseMock,
  getMyPetsResponseMock,
  eventFormValuesMock
} from './mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate,
    useParams: () => vi.fn()
  }
})

const createEventMutation = {
  query: CREATE_EVENT,
  variables: createEventPayloadMock
}
const getPetsNamesQuery = {
  query: GET_MY_PETS_NAMES_QUERY,
  variables: { search: '' }
}
const positiveMocks = [
  {
    request: createEventMutation,
    result: createEventResponseMock
  },
  {
    request: getPetsNamesQuery,
    result: getMyPetsResponseMock
  }
]

describe('[EventForm]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={positiveMocks}>
        <EventForm />
      </MockedProvider>
    )

    Object.values(EVENT_FORM_TEST_IDS).forEach(_testId => {
      const testFormInput = screen.getByTestId(_testId)
      expect(testFormInput).toBeInTheDocument()
    })
  })

  test('Should render the page and go to event list if the form is cancelled', async () => {
    render(
      <MockedProvider mocks={positiveMocks}>
        <EventForm />
      </MockedProvider>
    )

    const cancelBtn = screen.getByTestId(EVENT_FORM_TEST_IDS.CANCEL_BTN)
    fireEvent.click(cancelBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
    })
  })

  test('Should render the page, change form inputs data and submit it', async () => {
    render(
      <MockedProvider mocks={positiveMocks}>
        <EventForm />
      </MockedProvider>
    )

    await waitFor(async () => {
      for (const [eventFormValueI, eventFormValue] of Object.entries(eventFormValuesMock)) {
        const selectedTestId = Object.values(EVENT_FORM_TEST_IDS)[+eventFormValueI]
        const testFormInput = screen.getByTestId(selectedTestId) as HTMLInputElement

        const valueToSet = eventFormValueI === 'date' ? eventFormValuesMock[2] : eventFormValue
        fireEvent.change(testFormInput, { target: { value: valueToSet } })

        expect(testFormInput.value).toBe(valueToSet)
      }
    })

    const submitBtn = screen.getByTestId(EVENT_FORM_TEST_IDS.SUBMIT_BTN)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
    })
  })

  // TODO: Add a test case for event creation with a provided petId once the form is ready to handle it
})

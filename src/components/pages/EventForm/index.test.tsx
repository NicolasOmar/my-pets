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
  valuesToAppear,
  createEventPayloadMock,
  createEventResponseMock,
  getMyPetsResponseMock
} from './index.mocks.json'

const mockUseNavigate = vi.fn()
const mockUseParams = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate,
    useParams: () => mockUseParams
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
      for (const [eventDataPropI, eventDataProp] of Object.entries(valuesToAppear)) {
        const selectedTestId = Object.values(EVENT_FORM_TEST_IDS)[+eventDataPropI]
        const testFormInput = screen.getByTestId(selectedTestId) as HTMLInputElement

        const valueToSet = eventDataPropI === 'date' ? valuesToAppear[2] : eventDataProp
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
})

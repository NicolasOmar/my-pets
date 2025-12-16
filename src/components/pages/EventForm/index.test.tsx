import React from 'react'
import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { CREATE_EVENT } from '../../../graphql/mutations'
// CONTEXT
// COMPONENTS
import EventForm from '.'
// MOCKS
import { testing } from './index.mocks.json'
import { EVENT_FORM_TEST_IDS } from '../../../constants/forms'
import { GET_MY_PETS_NAMES_QUERY } from '../../../graphql/queries'

const baseRequest = {
  query: CREATE_EVENT,
  variables: testing.mutationVariables
}
const getPetsNamesRequest = {
  query: GET_MY_PETS_NAMES_QUERY,
  variables: { search: '' }
}

interface RenderWithRouterProps {
  initialRoute?: string
  routePath?: string
  mockedElement: React.ReactNode
}

const renderWithRouter = ({
  initialRoute = '/',
  routePath = '/',
  mockedElement
}: RenderWithRouterProps) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <Routes>
      <Route path={routePath} element={mockedElement} />
    </Routes>
  </MemoryRouter>
)

describe('[EventForm]', () => {
  const { positiveResponse, valuesToAppear, initialRoute } = testing
  const positiveMock = [
    {
      request: baseRequest,
      result: positiveResponse
    },
    {
      request: getPetsNamesRequest,
      result: { data: { myPetsNames: [] } }
    }
  ]

  test('Should render the page with its inputs', () => {
    render(
      renderWithRouter({
        initialRoute: initialRoute,
        routePath: '/add-event/:petId',
        mockedElement: (
          <MockedProvider mocks={positiveMock}>
            <EventForm />
          </MockedProvider>
        )
      })
    )

    Object.values(EVENT_FORM_TEST_IDS).forEach(_testId => {
      const testFormInput = screen.getByTestId(_testId)
      expect(testFormInput).toBeInTheDocument()
    })
  })

  test('Should render the page, change form inputs data and submit it', () => {
    render(
      renderWithRouter({
        initialRoute: initialRoute,
        routePath: '/add-event/:petId',
        mockedElement: (
          <MockedProvider mocks={positiveMock}>
            <EventForm />
          </MockedProvider>
        )
      })
    )

    Object.values(positiveResponse.data.createEvent).forEach(
      async (eventDataProp, eventDataPropI) => {
        const selectedTestId = Object.values(EVENT_FORM_TEST_IDS)[eventDataPropI]
        const testFormInput = screen.getByTestId(selectedTestId)

        userEvent.click(testFormInput)
        fireEvent.change(testFormInput, { target: { value: eventDataProp } })

        await waitFor(() => {
          expect(testFormInput.innerHTML).toBe(valuesToAppear[eventDataPropI])
        })
      }
    )
  })
})

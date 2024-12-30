import React from 'react'
import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { CREATE_EVENT } from '../../../graphql/mutations'
// CONTEXT
// COMPONENTS
import EventForm from '.'
// MOCKS
import { inputs, addEventButton } from './config.json'
import { testing } from './index.mocks.json'

const baseRequest = {
  query: CREATE_EVENT,
  variables: testing.mutationVariables
}

const renderWithRouter = ({ initialRoute = '/', routePath = '/', mockedElement }) => (
  <MemoryRouter initialEntries={['Test page', initialRoute]}>
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
    }
  ]

  test('Should render the page with its inputs', () => {
    render(
      renderWithRouter({
        initialRoute: initialRoute,
        routePath: '/add-event/:petId',
        mockedElement: (
          <MockedProvider mocks={positiveMock} addTypename={false}>
            <EventForm />
          </MockedProvider>
        )
      })
    )

    Object.keys(inputs).forEach(key => {
      const testFormInput = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(testFormInput).toBeInTheDocument()
    })
  })

  test('Should render the page, change form inputs data and submit it', async () => {
    render(
      renderWithRouter({
        initialRoute: initialRoute,
        routePath: '/add-event/:petId',
        mockedElement: (
          <MockedProvider mocks={positiveMock} addTypename={false}>
            <EventForm />
          </MockedProvider>
        )
      })
    )

    Object.keys(inputs).forEach(async (key, keyIndex) => {
      const testFormInput = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      const dataToBeInserted = positiveResponse.data.createEvent

      userEvent.click(testFormInput)
      fireEvent.change(testFormInput, { target: { value: dataToBeInserted[key] } })

      await waitFor(() => {
        expect(testFormInput.innerHTML).toBe(valuesToAppear[keyIndex])
      })
    })

    const submitButton = screen.getByText(addEventButton.label)
    await userEvent.click(submitButton)

    Object.keys(inputs).forEach(key => {
      expect(() => screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)).toThrow()
    })
  })
})

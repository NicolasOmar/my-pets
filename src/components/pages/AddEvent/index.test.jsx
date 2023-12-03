import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
import { CREATE_EVENT } from '../../../graphql/mutations'
// CONTEXT
// COMPONENTS
import AddEvent from '.'
// MOCKS
import { inputs, addEventButton } from './config.json'
import { testing } from './index.mocks.json'

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

const baseRequest = {
  query: CREATE_EVENT
}

describe('[AddEvent]', () => {
  const { positiveResponse, valuesToAppear } = testing

  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddEvent />
      </MockedProvider>
    )

    Object.keys(inputs).forEach(key => {
      const testFormInput = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(testFormInput).toBeInTheDocument()
    })
  })

  test.skip('Should render the page, change form inputs data and submit it', async () => {
    const positiveMock = [
      {
        request: baseRequest,
        result: positiveResponse
      }
    ]

    render(
      <MockedProvider mocks={positiveMock} addTypename={false}>
        <AddEvent />
      </MockedProvider>
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
  })
})

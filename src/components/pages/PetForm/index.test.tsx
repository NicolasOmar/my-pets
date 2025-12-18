import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { GET_PET_TYPES_QUERY, GET_COLORS_QUERY } from '../../../graphql/queries'
// CONTEXT
// COMPONENTS
import PetForm from '.'
// CONSTANTS
import { PET_FORM_TEST_IDS } from '../../../constants/forms'
import { APP_ROUTES } from '../../../constants/routes'
// MOCKS
import {
  // getPetPayloadMock,
  // getPetResponseMock,
  getColorsResponseMock,
  getPetTypesResponseMock
  // updatePetPayloadMock
} from './index.mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate,
    useParams: () => ({ petId: null })
  }
})

// const getPetGraphqlMock = [
//   {
//     request: { query: GET_PET_QUERY, variables: getPetPayloadMock },
//     result: getPetResponseMock
//   }
// ]
const additionalGrapqlMocks = [
  {
    request: { query: GET_PET_TYPES_QUERY },
    result: getPetTypesResponseMock
  },
  {
    request: { query: GET_COLORS_QUERY },
    result: getColorsResponseMock
  }
]

describe('[PetForm]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={additionalGrapqlMocks}>
        <PetForm />
      </MockedProvider>
    )

    Object.values(PET_FORM_TEST_IDS).forEach(_testId => {
      if (_testId !== PET_FORM_TEST_IDS.PASSED_AWAY) {
        const inputElem = screen.getByTestId(_testId)
        expect(inputElem).toBeInTheDocument()
      }
    })
  })

  test('Should render the page with its inputs and go to pet list if the form is cancelled', async () => {
    render(
      <MockedProvider mocks={additionalGrapqlMocks}>
        <PetForm />
      </MockedProvider>
    )

    const cancelBtn = screen.getByTestId(PET_FORM_TEST_IDS.CANCEL_BTN)
    fireEvent.click(cancelBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
    })
  })

  // TODO: Add test case for pet update once the form is ready to handle it
  // TODO: Add test case for pet creation once the form is ready to handle it

  // test.only('Should make the graphQL request by filling the form and clicking the submit button', async () => {
  //   render(
  //     <MockedProvider mocks={[...additionalGrapqlMocks, ...getPetGraphqlMock]}>
  //       <PetForm />
  //     </MockedProvider>
  //   )

  //   Object.values(PET_FORM_TEST_IDS).forEach((_testId, _i) => {
  //     const value = Object.values(updatePetPayloadMock.payload)
  //     const inputElem = screen.getByTestId(_testId)

  //     fireEvent.change(inputElem, { target: { value: value[_i] || '' } })
  //   })

  //   const submitButton = screen.getByTestId('test-submit-pet-form')
  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(mockUseNavigate).toHaveBeenCalled()
  //     expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.PET_LIST)
  //   })
  // })
})

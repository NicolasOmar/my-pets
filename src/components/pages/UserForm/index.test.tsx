import React from 'react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes'
// GRAPHQL
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import UserForm from '.'
import { USER_FORM_TEST_IDS } from '../../../constants/forms'
// MOCKS
import { formValueMocks, userCreatePayloadMock, userCreateResponseMock } from './index.mocks.json'
import { CREATE_USER } from '../../../graphql/mutations'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

vi.mock('../../../functions/encrypt', () => ({
  encryptPass: () => 'encryptedPass'
}))

const positiveMock = [
  {
    request: {
      query: CREATE_USER,
      variables: userCreatePayloadMock
    },
    result: userCreateResponseMock
  }
]

describe('[UserForm]', () => {
  beforeEach(() => {
    const providerMock = { setUserData: vi.fn() }

    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={positiveMock}>
          <UserForm />
        </MockedProvider>
      </UserContext.Provider>
    )
  })

  test('Should render the page with its inputs', () => {
    Object.values(USER_FORM_TEST_IDS).forEach(_testId => {
      const inputElem = screen.getByTestId(_testId)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should redirect user to sign up page', async () => {
    const loginBtn = screen.getByTestId(USER_FORM_TEST_IDS.LOG_IN_BTN)
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.LOGIN)
    })
  })

  test('Should make the graphQL request by filling the form and clicking the submit button', async () => {
    Object.values(USER_FORM_TEST_IDS).forEach((_testId, _i) => {
      const formValue = Object.values(formValueMocks)
      const inputElem = screen.getByTestId(_testId)
      fireEvent.change(inputElem, { target: { value: formValue[_i] } })
    })

    const submitBtn = screen.getByTestId(USER_FORM_TEST_IDS.SUBMIT_BTN)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.HOME)
    })
  })
})

import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes'
// GRAPHQL
import { LOGIN_USER } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import LoginForm from '.'
// CONSTANTS
import { LOGIN_FORM_TEST_IDS } from '../../../constants/forms'
// MOCKS
import { loginUserPayloadMock, loginUserResponseMock } from './mocks.json'

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

describe('[LoginForm]', () => {
  const userContextMock = {
    userData: loginUserPayloadMock.payload,
    setUserData: vi.fn()
  }
  const graphqlMock = [
    {
      request: {
        query: LOGIN_USER,
        variables: loginUserPayloadMock
      },
      result: loginUserResponseMock
    }
  ]

  test('Should render the page with its inputs', () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={[]}>
          <LoginForm />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.values(LOGIN_FORM_TEST_IDS).forEach(_testId => {
      const inputElem = screen.getByTestId(_testId)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should redirect user to sign up page', async () => {
    render(
      <UserContext.Provider value={{ ...userContextMock, userData: null }}>
        <MockedProvider mocks={[]}>
          <LoginForm />
        </MockedProvider>
      </UserContext.Provider>
    )

    const signUpBtn = screen.getByTestId(LOGIN_FORM_TEST_IDS.SIGN_UP_BTN)
    fireEvent.click(signUpBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.USER_FORM)
    })
  })

  test('Should make the graphQL request by filling the form and clicking the submit button', async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={graphqlMock}>
          <LoginForm />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.values(loginUserPayloadMock.payload).forEach((loginFormValue, _i) => {
      const loginFormTestId = Object.values(LOGIN_FORM_TEST_IDS)
      const inputElem = screen.getByTestId(loginFormTestId[_i])
      fireEvent.change(inputElem, { target: { value: loginFormValue } })
    })

    const submitBtn = screen.getByTestId(LOGIN_FORM_TEST_IDS.SUBMIT_BTN)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
    })
  })
})

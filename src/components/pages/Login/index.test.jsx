import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
// APP_ROUTES
import ROUTES from '../../../constants/routes.json'
// GRAPHQL
import { LOGIN } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import Login from '.'
// MOCKS
import { loginUserMock } from './index.mocks.json'
import { inputs, loginButton, goToSignUpButton } from './config.json'

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

describe('[Login]', () => {
  const providerMock = {
    userData: loginUserMock,
    setUserData: vi.fn()
  }

  test('Should render the page with its inputs', () => {
    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Login />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test.skip('Should make the graphQL request by clicking the submit button', async () => {
    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: loginUserMock
        },
        result: {
          data: {
            loginUser: {
              name: 'testUer',
              lastName: 'testUer',
              email: 'testUer',
              token: 'testUer'
            }
          }
        }
      }
    ]

    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      fireEvent.change(inputElem, { target: { value: loginUserMock[key] } })
    })

    const submitBtn = await screen.getByTestId(
      `test-${loginButton.type}-button-${loginButton.color}`
    )
    fireEvent.click(submitBtn)

    await waitFor(
      () => {
        expect(mockUseNavigate).toHaveBeenCalled()
      },
      { timeout: 2500 }
    )
  })

  test('Should redirect user to sign up page', async () => {
    render(
      <UserContext.Provider value={{ ...providerMock, userData: null }}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Login />
        </MockedProvider>
      </UserContext.Provider>
    )

    const signUpBtn = screen.getByText(goToSignUpButton.label)
    fireEvent.click(signUpBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(ROUTES.APP_ROUTES.NEW_USER)
    })
  })
})

import React from 'react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
// APP_ROUTES
import ROUTES from '../../../constants/routes.json'
// GRAPHQL
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import NewUser from '.'
// MOCKS
import { inputs, goToLoginButton } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[NewUser]', () => {
  const providerMock = { setUserData: vi.fn() }

  beforeEach(() => {
    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={[]} addTypename={false}>
          <NewUser />
        </MockedProvider>
      </UserContext.Provider>
    )
  })

  test('Should render the page with its inputs', () => {
    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should redirect user to sign up page', async () => {
    const loginBtn = screen.getByText(goToLoginButton.label)
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(ROUTES.APP_ROUTES.LOGIN)
    })
  })
})

import React from 'react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
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

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[UserForm]', () => {
  const providerMock = { setUserData: vi.fn() }

  beforeEach(() => {
    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={[]} addTypename={false}>
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
})

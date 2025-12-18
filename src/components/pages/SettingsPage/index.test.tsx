import React from 'react'
import { MockedProvider } from '@apollo/client/testing/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
// GRAPHQL
import { UPDATE_PASS, UPDATE_USER } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import SettingsPage from '.'
// CONSTANTS
import { PASS_UPDATE_FORM_TEST_IDS, USER_UPDATE_FORM_TEST_IDS } from '../../../constants/forms'
import { APP_ROUTES } from '../../../constants/routes'
// MOCKS
import {
  userDataMock,
  getLoggedUserMock,
  updatedUserPayloadMock,
  updateUserResponseMock,
  updatePassPayloadMock,
  updatePassResponseMock
} from './mocks.json'

const userContextMock = {
  userData: userDataMock,
  setUserData: vi.fn()
}
const updateUserGraphqlMock = [
  {
    request: {
      query: UPDATE_USER,
      variables: updatedUserPayloadMock
    },
    result: updateUserResponseMock
  }
]
const updatePassGraphqlMock = [
  {
    request: {
      query: UPDATE_PASS,
      variables: updatePassPayloadMock
    },
    result: updatePassResponseMock
  }
]
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

vi.mock('../../../functions/local-storage', () => ({
  ...vi.importActual('../../../functions/local-storage'),
  getLoggedUser: () => getLoggedUserMock,
  setLoggedUser: vi.fn()
}))

vi.mock('../../../functions/encrypt', () => ({
  encryptPass: () => 'encryptedPass'
}))

describe('[SettingsPage]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={[]}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.values(USER_UPDATE_FORM_TEST_IDS).forEach(_testId => {
      const inputElem = screen.getByTestId(_testId)
      expect(inputElem).toBeInTheDocument()
    })

    Object.values(PASS_UPDATE_FORM_TEST_IDS).forEach(_testId => {
      const inputElem = screen.getByTestId(_testId)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should return the user from the Update User form to the Home page if they click the Go Back button', async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={[]}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )

    const goBackBtn = screen.getByTestId(USER_UPDATE_FORM_TEST_IDS.GO_BACK_BTN)
    fireEvent.click(goBackBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.HOME)
    })
  })

  test('Should return the user from the Update Pass form to the Home page if they click the Go Back button', async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={[]}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )

    const goBackBtn = screen.getByTestId(PASS_UPDATE_FORM_TEST_IDS.GO_BACK_BTN)
    fireEvent.click(goBackBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.HOME)
    })
  })

  test('Should make the graphQL request by filling the update user form and clicking the submit button', async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={updateUserGraphqlMock}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )

    await waitFor(() => {
      Object.values(updatedUserPayloadMock.payload).forEach((value, index) => {
        const testId = Object.values(USER_UPDATE_FORM_TEST_IDS)[index]
        const formField = screen.getByTestId(testId)
        fireEvent.change(formField, { target: { value } })
      })
    })

    const submitBtn = screen.getByTestId(USER_UPDATE_FORM_TEST_IDS.SUBMIT_BTN)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      Object.values(updatedUserPayloadMock.payload).forEach((value, index) => {
        const testId = Object.values(USER_UPDATE_FORM_TEST_IDS)[index]
        const formField = screen.getByTestId(testId)
        expect(formField).toHaveValue(value)
      })
    })
  })

  test('Should make the graphQL request by filling the update password form and clicking the submit button', async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={updatePassGraphqlMock}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )

    await waitFor(() => {
      Object.values(updatePassPayloadMock.payload).forEach((value, index) => {
        const testId = Object.values(PASS_UPDATE_FORM_TEST_IDS)[index]
        const formField = screen.getByTestId(testId)
        fireEvent.change(formField, { target: { value } })
      })
    })

    const submitBtn = screen.getByTestId(PASS_UPDATE_FORM_TEST_IDS.SUBMIT_BTN)
    fireEvent.click(submitBtn)

    await waitFor(() => {
      Object.values(updatePassPayloadMock.payload).forEach((value, index) => {
        const testId = Object.values(PASS_UPDATE_FORM_TEST_IDS)[index]
        const formField = screen.getByTestId(testId)
        expect(formField).toHaveValue(value)
      })
    })
  })
})

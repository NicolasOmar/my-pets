import React from 'react'
import { describe, test, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes'
// GRAPHQL
import { LOGOUT } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import UserHeader from '.'
// MOCKS
import { testConfig, logoutResponseMock } from './mocks.json'

const _logoutMock = [
  {
    request: { query: LOGOUT },
    result: logoutResponseMock
  }
]
const userProviderMock = { setUserData: vi.fn() }
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[UserHeader]', () => {
  beforeAll(() => {
    window.matchMedia = query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    })
  })

  beforeEach(() => {
    render(
      <UserContext.Provider value={userProviderMock}>
        <MockedProvider mocks={_logoutMock}>
          <UserHeader name={testConfig.name} />
        </MockedProvider>
      </UserContext.Provider>
    )
  })

  afterEach(() => cleanup())

  test('Should render the component with required props only', () => {
    const element = screen.getByText(testConfig.name.toUpperCase())
    expect(element).toBeInTheDocument()
  })

  test('Should render each option and execute user redirection', () => {
    const testRoutes = [
      APP_ROUTES.PET_FORM,
      APP_ROUTES.EVENT_FORM,
      APP_ROUTES.PET_LIST,
      APP_ROUTES.SETTINGS,
      APP_ROUTES.LOGIN
    ]

    testConfig.options.forEach(async (optionLabel, i) => {
      const menuOption = screen.getByText(optionLabel)
      fireEvent.click(menuOption)

      await waitFor(() => {
        expect(menuOption).toBeInTheDocument()
        expect(mockUseNavigate).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith(testRoutes[i])
      })
    })
  })
})

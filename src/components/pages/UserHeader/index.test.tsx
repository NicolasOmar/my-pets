import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
// APP_ROUTES
import ROUTES from '../../../constants/routes'
// GRAPHQL
import { LOGOUT } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import UserHeader from '.'
// MOCKS
import { testConfig, logoutMock } from './index.mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[UserHeader]', () => {
  const _logoutMock = [
    {
      ...logoutMock,
      request: {
        ...logoutMock.request,
        query: LOGOUT
      }
    }
  ]
  const providerMock = { setUserData: vi.fn() }

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
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={_logoutMock} addTypename={false}>
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
    // const onLogoutMock = jets.fn()
    const { APP_ROUTES } = ROUTES
    const testRoutes = [
      APP_ROUTES.PET_FORM,
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

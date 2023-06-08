import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, test, expect, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
import ROUTES from '../../../constants/routes.json'
// GRAPHQL
import { LOGOUT } from '../../../graphql/mutations'
// REDUX
import reducers from '../../../redux/reducers'
// COMPONENTS
import UserHeader from '.'
// MOCKS
import { testConfig, logoutMock } from './index.mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[UserHeader]', () => {
  const _logout = [
    {
      ...logoutMock,
      request: {
        ...logoutMock.request,
        query: LOGOUT
      }
    }
  ]

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
      <Provider store={configureStore({ reducer: reducers })}>
        <MockedProvider mocks={_logout} addTypename={false}>
          <UserHeader name={testConfig.name} />
        </MockedProvider>
      </Provider>
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
      APP_ROUTES.ADD_PET,
      APP_ROUTES.LIST_MY_PETS,
      APP_ROUTES.UPDATE_USER,
      APP_ROUTES.UPDATE_PASS,
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

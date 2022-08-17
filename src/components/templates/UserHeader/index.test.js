import { MockedProvider } from '@apollo/client/testing'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
import { LOGOUT } from '../../../graphql/mutations'
// REDUX
import reducers from '../../../redux/reducers'
// COMPONENTS
import UserHeader from '.'
// MOCKS
import { testConfig, logoutMock } from './index.mocks.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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

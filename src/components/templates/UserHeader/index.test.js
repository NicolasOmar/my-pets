import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes.json'
// REDUX
import reducers from '../../../redux/reducers'
// COMPONENTS
import UserHeader from '.'
// MOCKS
import { testConfig } from './index.mocks.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[UserHeader]', () => {
  beforeEach(() => {
    render(
      <Provider store={configureStore({ reducer: reducers })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <UserHeader name={testConfig.name} />
        </MockedProvider>
      </Provider>
    )
  })

  test('Should render the component with required props only', () => {
    const element = screen.getByText(testConfig.name.toUpperCase())
    expect(element).toBeInTheDocument()
  })

  test('Should render each option and execute user redirection', () => {
    const testRoutes = [APP_ROUTES.UPDATE_USER, APP_ROUTES.UPDATE_PASS, APP_ROUTES.LOGIN]

    testConfig.options.forEach((optionLabel, i) => {
      const menuOption = screen.getByText(optionLabel)
      expect(menuOption).toBeInTheDocument()

      if (i <= 1) {
        fireEvent.click(menuOption)
        expect(mockUseNavigate).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith(testRoutes[i])
      }
    })
  })
})

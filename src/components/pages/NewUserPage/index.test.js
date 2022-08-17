import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import NewUserPage from '.'
// MOCKS
import { inputs, goToLoginButton } from './config.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[NewUserPage]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <NewUserPage />
        </MockedProvider>
      </Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should redirect user to sign up page', async () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <NewUserPage />
        </MockedProvider>
      </Provider>
    )

    const loginBtn = screen.getByText(goToLoginButton.label)
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.LOGIN)
    })
  })
})

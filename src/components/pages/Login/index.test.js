import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
import { LOGIN } from '../../../graphql/mutations'
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import Login from '.'
// MOCKS
import { loginUserMock } from './index.mocks.json'
import { inputs, loginButton, goToSignUpButton } from './config.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

jest.mock('../../../functions/encrypt', () => ({
  encryptPass: () => 'encryptedPass'
}))

describe('[Login]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Login />
        </MockedProvider>
      </Provider>
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
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Provider>
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
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Login />
        </MockedProvider>
      </Provider>
    )

    const signUpBtn = screen.getByText(goToSignUpButton.label)
    fireEvent.click(signUpBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(APP_ROUTES.NEW_USER)
    })
  })
})
